// @flow

import type {ServerAction, ServerResponse} from '../../common/src/actions';
import verror from 'verror';
import type {ApiGateway} from './clients/api-gateway';
import type {Redis} from './clients/redis';
import {getState} from './connectors/database';
import {sendServerResponse} from './connectors/api';
import { rootReducer } from '../../common/src/state/reducers/root';
import type { CommonState } from '../../common/src/state';


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

        await sendServerResponse({apiGateway, connectionId, response});
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

const serializeState = ({state}: { state: CommonState }): string => {
    return JSON.stringify(state);
};

export const executeAction = async ({action, redis}: { action: ServerAction, redis: Redis }): Promise<ServerResponse> => {
    try {
        console.group(`executing action`);
        for (let i = 0; i < optimisticLockingAttempts; i++) {
            console.group(`optimistic locking attempt ${i + 1}/${optimisticLockingAttempts}`);
            console.info(`watching state`);

            await redis.watch(`state`);

            const state = await getState({redis});

            console.info(`applying action to the state`);
            const reducerResult = rootReducer({action, state});

            if (reducerResult.errors.length > 0) {
                console.info(`returning validation error`);
                return {
                    state,
                    errors: reducerResult.errors,
                    request: action,
                };
            }

            const newState = reducerResult.state;

            if (newState == null) {
                throw Error(`new state missing`);
            }

            console.info(`serializing state`);
            const serializedState: string = serializeState({state: newState});

            console.info(`persisting new state`);

            const result = await redis.multi().set(`state`, serializedState).exec();

            if (result != null) {
                return {
                    state: newState,
                    errors: [],
                    request: action,
                };
            }

            console.info(`concurrent state modification detected - retrying`);
        }
        throw Error(`optimistic locking failed after ${optimisticLockingAttempts} attempts`);
    } catch (error) {
        throw new verror.VError(
            {
                name: 'ActionExecutionError',
                cause: error,
            },
            'execution failed'
        );
    } finally {
        console.groupEnd();
        console.groupEnd();
    }
};