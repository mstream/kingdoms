// @flow

import verror from 'verror';
import type { ApiGateway } from './clients/api-gateway';
import type { Redis } from './clients/redis';
import { database } from './connectors/database';
import { sendServerResponse } from './connectors/api';
import { rootReducer } from '../../common/src/state/modules/root';
import type { ServerResponse } from '../../common/src/types';
import type { CommonState } from '../../common/src/state/modules/types';
import { validateCommonStateType } from '../../common/src/validators';
import type { CommonAction } from '../../common/src/state/types';

const optimisticLockingAttempts = 3;

export const sendResponse = async ({
    apiGateway,
    redis,
    connectionId,
    response,
}: {
    apiGateway: ApiGateway,
    redis: Redis,
    connectionId: string,
    response: ServerResponse,
}): Promise<void> => {
    try {
        console.group(`sending response`);
        console.info(`sending response back to the api gateway`);

        await sendServerResponse({ apiGateway, connectionId, response });
    } catch (error) {
        if (error.statusCode === 410) {
            console.info(`Found stale connection, deleting ${connectionId}`);
            try {
                await redis.srem(`connection-ids`, connectionId);
            } catch (error) {
                console.error(error.stack);
            }
        } else {
            console.error(error.stack);
        }
        throw error;
    } finally {
        console.groupEnd();
    }
};

export const executeAction = async ({
    action,
    environment,
    redis,
}: {
    action: CommonAction,
    environment: string,
    redis: Redis,
}): Promise<ServerResponse> => {
    try {
        console.group(`executing action`);
        for (let i = 0; i < optimisticLockingAttempts; i++) {
            console.group(
                `optimistic locking attempt ${
                    i + 1
                }/${optimisticLockingAttempts}`,
            );
            console.info(`watching state`);

            const stateTransformer = ({
                state,
            }: {
                state: CommonState,
            }): $ReadOnly<{
                errors: $ReadOnlyArray<string>,
                state: ?CommonState,
            }> => {
                console.info(`applying action to the state`);
                return rootReducer({ action, state });
            };

            const casResult = await database.casState({
                environment,
                redis,
                stateTransformer,
                validateState: validateCommonStateType,
                worldId: 'default',
            });

            if (casResult.errors.length > 0) {
                return {
                    errors: casResult.errors,
                    request: action,
                    state: casResult.previousState,
                };
            }

            if (casResult.savedState != null) {
                return {
                    errors: [],
                    state: casResult.savedState,
                    request: action,
                };
            }

            console.info(`concurrent state modification detected - retrying`);
        }
        throw Error(
            `optimistic locking failed after ${optimisticLockingAttempts} attempts`,
        );
    } catch (error) {
        throw new verror.VError(
            {
                name: 'ActionExecutionError',
                cause: error,
            },
            'execution failed',
        );
    } finally {
        console.groupEnd();
        console.groupEnd();
    }
};
