// @flow

import {
    createRedisClient,
} from '../../clients/redis';
import {
    createApiGatewayClient,
} from '../../clients/api-gateway';
import {
    ERROR_STATE_NOT_INITIALIZED,
    executeAction,
    sendResponse,
} from '../../util';
import type {
    ProxyHandler,
} from '../types';
import {
    database,
} from '../../connectors/database';
import type {
    ServerResponse,
} from '../../../../common/src/types';
import {
    GET_CURRENT_STATE,
} from '../../../../common/src/state/actions/types';
import {
    CHANGE_CITY_NAME,
    CREATE_CITY,
    UPGRADE_BUILDING,
} from '../../../../common/src/state/modules/cities/actions/types';
import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from '../../../../common/src/state/modules/orders/actions/types';
import {
    createConfig,
} from '../../config';
import verror from 'verror';
import {
    generateRequestAcceptedResponse,
    generateRequestExecutionErrorResponse,
    generateRequestRejectionResponse,
} from '../util';
import {
    createLogger,
} from '../../../../common/src/logging';
import {
    validateEvent,
} from './validation';

const config = createConfig();
const logger = createLogger(
    {
        config,
    },
);

const apiGateway = createApiGatewayClient(
    {
        config,
    },
);

const redis = createRedisClient(
    {
        config,
    },
);


export const handler: ProxyHandler = async ( event, ) => {

    logger.debug(
        `received event: %o`,
        event,
    );

    try {

        const eventValidationResult = validateEvent(
            {
                event,
            },
        );

        if ( eventValidationResult.errors.length > 0 ) {

            const errorReason = `event validation error: ${ JSON.stringify(
                eventValidationResult.errors,
            ) }`;

            logger.warn(
                errorReason,
            );

            return generateRequestRejectionResponse(
                {
                    reason: errorReason,
                },
            );

        }

        const eventValidationResultEvent = eventValidationResult.result;

        if ( eventValidationResultEvent == null ) {

            throw Error(
                `missing event validation result`,
            );

        }

        const {
            connectionId, serverRequest, username,
        } = eventValidationResultEvent;

        const {
            action, worldId,
        } = serverRequest;

        const {
            playerId,
        } = action.payload;

        if ( playerId !== username ) {

            const errorReason = `username '${ username }' does not match the playerId '${ playerId }'`;

            logger.warn(
                errorReason,
            );

            return generateRequestRejectionResponse(
                {
                    reason: errorReason,
                },
            );

        }

        const sendResponseBackToClient = async ( {
            response,
        }: {
            response: ServerResponse,
        }, ) => {

            return await sendResponse(
                {
                    apiGateway,
                    connectionId,
                    redis,
                    response,
                },
            );

        };

        const {
            environment,
        } = config;

        switch ( action.type ) {

        case GET_CURRENT_STATE: {

            const getWorldStatePromise = database.stateByWorld.get(
                {
                    key: {
                        environment,
                        worldId,
                    },
                    logger,
                    redis,
                },
            );

            const addPlayerConnectionPromise = database.connectionByPlayer.set(
                {
                    key: {
                        environment,
                        playerId,
                    },
                    logger,
                    redis,
                    value: connectionId,
                },
            );

            const addPlayerWorldPromise = database.worldByPlayer.set(
                {
                    key: {
                        environment,
                        playerId,
                    },
                    logger,
                    redis,
                    value: worldId,
                },
            );

            const addPlayerToWorldPromise = database.playersByWorld.add(
                {
                    key: {
                        environment,
                        worldId,
                    },
                    logger,
                    redis,
                    value: playerId,
                },
            );

            const [
                state,
            ] = await Promise.all(
                [
                    getWorldStatePromise,
                    addPlayerConnectionPromise,
                    addPlayerToWorldPromise,
                    addPlayerWorldPromise,
                ],
            );

            if ( state == null ) {

                throw new verror.VError(
                    {
                        name: `STATE_NOT_INITIALIZED`,
                    },
                );

            }

            await sendResponseBackToClient(
                {
                    response: {
                        errors : [],
                        request: {
                            action,
                            worldId,
                        },
                        state,
                    },
                },
            );

            return generateRequestAcceptedResponse();

        }
        case UPGRADE_BUILDING:
        case CHANGE_CITY_NAME:
        case CREATE_CITY:
        case CREATE_SCHEDULED_ATTACK_ORDER: {

            const response = await executeAction(
                {
                    action,
                    environment: config.environment,
                    logger,
                    redis,
                    worldId,
                },
            );

            await sendResponseBackToClient(
                {
                    response,
                },
            );

            return generateRequestAcceptedResponse();

        }
        default: {

            const state = await database.stateByWorld.get(
                {
                    key: {
                        environment: config.environment,
                        worldId,
                    },
                    logger,
                    redis,
                },
            );

            if ( state == null ) {

                throw new verror.VError(
                    {
                        name: ERROR_STATE_NOT_INITIALIZED,
                    },
                );

            }

            await sendResponseBackToClient(
                {
                    response: {
                        errors: [
                            `unsupported action`,
                        ],
                        request: serverRequest,
                        state,
                    },
                },
            );

            const errorReason = `unsupported request type: ${ action.type }`;

            logger.warn(
                errorReason,
            );

            return generateRequestRejectionResponse(
                {
                    reason: errorReason,
                },
            );

        }

        }

    } catch ( error ) {

        logger.error(
            error.stack,
        );

        return generateRequestExecutionErrorResponse(
            {
                reason: `unexpected error`,
            },
        );

    }

};
