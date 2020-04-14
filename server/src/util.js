// @flow

import verror from 'verror';
import type {
    ApiGateway,
} from './clients/api-gateway/types';
import type {
    Redis,
} from './clients/redis/types';
import {
    database,
} from './connectors/database';
import {
    sendServerResponse,
} from './connectors/api';
import {
    rootReducer,
} from '../../common/src/state/modules/root';
import type {
    ServerRequest, ServerResponse,
} from '../../common/src/types';
import type {
    CommonState,
} from '../../common/src/state/modules/types';
import type {
    CommonAction,
} from '../../common/src/state/types';
import type {
    DatabaseValueCasResult,
} from './connectors/database/_abstract/value/operations/cas/types';
import type {
    Logger,
} from '../../common/src/logging/types';

export const ERROR_ACTION_EXECUTION: 'ERROR_ACTION_EXECUTION'
    = `ERROR_ACTION_EXECUTION`;
export const ERROR_STATE_NOT_INITIALIZED: 'ERROR_STATE_NOT_INITIALIZED'
    = `ERROR_STATE_NOT_INITIALIZED`;

const optimisticLockingAttempts = 3;

export const sendResponse = async ( {
    apiGateway,
    redis,
    connectionId,
    response,
}: {
    apiGateway: ApiGateway,
    redis: Redis,
    connectionId: string,
    response: ServerResponse,
}, ): Promise< void > => {

    try {

        console.group(
            `sending response`,
        );

        console.info(
            `sending response back to the api gateway`,
        );

        await sendServerResponse(
            {
                apiGateway,
                connectionId,
                response,
            },
        );

    } catch ( error ) {

        if ( error.statusCode === 410 ) {

            console.info(
                `Found stale connection, deleting ${ connectionId }`,
            );

            try {

                await redis.srem(
                    `connection-ids`,
                    connectionId,
                );

            } catch ( error ) {

                console.error(
                    error.stack,
                );

            }

        } else {

            console.error(
                error.stack,
            );

        }
        throw error;

    } finally {

        console.groupEnd();

    }

};

export const executeAction = async ( {
    action,
    environment,
    logger,
    redis,
    worldId,
}: {
    action: CommonAction,
    environment: string,
    logger: Logger,
    redis: Redis,
    worldId: string,
}, ): Promise< ServerResponse > => {

    try {

        console.group(
            `executing action`,
        );

        for ( let i = 0; i < optimisticLockingAttempts; i += 1 ) {

            console.group(
                `optimistic locking attempt ${
                    i + 1
                }/${ optimisticLockingAttempts }`,
            );

            console.info(
                `watching state`,
            );

            const valueTransformer = (
                {
                    value,
                }: $ReadOnly< {|
                value: CommonState,
            |} >,
            ): $ReadOnly< {|
                errors: $ReadOnlyArray< string >,
                value: ?CommonState,
            |} > => {

                console.info(
                    `applying action to the state`,
                );

                const {
                    errors, state,
                } = rootReducer(
                    {
                        action,
                        state: value,
                    },
                );

                return {
                    errors,
                    value: state,
                };

            };

            const casResult: DatabaseValueCasResult< CommonState > = await database.stateByWorld.cas(
                {
                    key: {
                        environment,
                        worldId,
                    },
                    logger,
                    redis,
                    valueTransformer,
                },
            );

            if ( casResult.previousValue == null ) {

                throw new verror.VError(
                    {
                        name: ERROR_STATE_NOT_INITIALIZED,
                    },
                );

            }

            const request: ServerRequest = {
                // $FlowFixMe
                action,
                worldId,
            };

            if ( casResult.errors.length > 0 ) {

                return {
                    errors: casResult.errors,
                    request,
                    state : casResult.previousValue,
                };

            }

            if ( casResult.savedValue != null ) {

                return {
                    errors: [],
                    request,
                    state : casResult.savedValue,
                };

            }

            console.info(
                `concurrent state modification detected - retrying`,
            );

        }
        throw Error(
            `optimistic locking failed after ${ optimisticLockingAttempts } attempts`,
        );

    } catch ( error ) {

        throw new verror.VError(
            {
                cause: error,
                name : ERROR_ACTION_EXECUTION,
            },
            `execution failed`,
        );

    } finally {

        console.groupEnd();
        console.groupEnd();

    }

};
