// @flow

import {
    database,
} from './connectors/database';
import {
    rootReducer,
} from '../../common/src/state/modules/root';
import {
    sendServerResponse,
} from './connectors/api';
import verror from 'verror';
import type {
    ApiGateway,
} from './clients/api-gateway/types';
import type {
    CommonAction,
} from '../../common/src/state/types';
import type {
    CommonState,
} from '../../common/src/state/modules/types';
import type {
    DatabaseValueCasResult,
} from './connectors/database/_abstract/value/operations/cas/types';
import type {
    Logger,
} from '../../common/src/logging/types';
import type {
    Redis,
} from './clients/redis/types';
import type {
    ServerResponse,
} from '../../common/src/types';

export const ERROR_ACTION_EXECUTION: 'ERROR_ACTION_EXECUTION'
    = `ERROR_ACTION_EXECUTION`;
export const ERROR_STATE_NOT_INITIALIZED: 'ERROR_STATE_NOT_INITIALIZED'
    = `ERROR_STATE_NOT_INITIALIZED`;

const optimisticLockingAttempts = 3;

export const sendResponse = async ( {
    apiGateway,
    logger,
    redis,
    connectionId,
    response,
}: {
    apiGateway: ApiGateway,
    logger: Logger,
    redis: Redis,
    connectionId: string,
    response: ServerResponse,
}, ): Promise< void > => {

    try {

        logger.info(
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

            logger.info(
                `Found stale connection, deleting: %s`,
                connectionId,
            );

            try {

                await redis.srem(
                    `connection-ids`,
                    connectionId,
                );

            } catch ( error ) {

                logger.error(
                    error.stack,
                );

            }

        } else {

            logger.error(
                error.stack,
            );

        }

        throw error;

    }

};

type ActionExecutionResult = $ReadOnly< {|
    errors: $ReadOnlyArray< string >,
    state: CommonState,
|} >;

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
}, ): Promise< ActionExecutionResult > => {

    try {

        logger.debug(
            `executing action`,
        );

        for ( let i = 0; i < optimisticLockingAttempts; i += 1 ) {

            logger.info(
                `optimistic locking attempt %d/%d`,
                i + 1,
                optimisticLockingAttempts,
            );

            logger.debug(
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

                logger.debug(
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

            const casResult: DatabaseValueCasResult< CommonState >
                = await database.stateByWorld.cas(
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

            if ( casResult.errors.length > 0 ) {

                return {
                    errors: casResult.errors,
                    state : casResult.previousValue,
                };

            }

            if ( casResult.savedValue != null ) {

                return {
                    errors: [],
                    state : casResult.savedValue,
                };

            }

            logger.info(
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

    }

};
