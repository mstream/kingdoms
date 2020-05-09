// @flow

import {
    CHANGE_CITY_NAME,
    CREATE_CITY,
    UPGRADE_BUILDING,
} from '../../../../common/src/state/modules/_children/cities/actions/types';
import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from '../../../../common/src/state/modules/_children/orders/actions/types';
import {
    GET_CURRENT_STATE,
} from '../../../../common/src/state/actions/types';
import {
    createApiGatewayClient,
} from '../../clients/api-gateway';
import {
    createConfig,
} from '../../config';
import {
    createLogger,
} from '../../../../common/src/logging';
import {
    createRedisClient,
} from '../../clients/redis';
import {
    executeAction, sendResponse,
} from '../../util';
import {
    generateRequestAcceptedResponse,
    generateRequestExecutionErrorResponse,
    generateRequestRejectionResponse,
} from '../util';
import {
    handleGetCurrentStateAction,
} from './action-handlers/get-current-state';
import {
    handleUnsupportedAction,
} from './action-handlers/unsuported';
import {
    validateServerRequestEvent,
} from './validation';

import {
    errorCreators, tryCatch,
} from '../../../../common/src/errors';
import type {
    CommonActionKey,
} from '../../../../common/src/state/types';
import type {
    ProxyHandler,
} from '../types';
import type {
    ServerResponse,
} from '../../../../common/src/types';

const config = createConfig();
const logger = createLogger(
    {
        config,
    },
);

const webSocketApiGateway = createApiGatewayClient(
    {
        config,
    },
);

const redis = createRedisClient(
    {
        config,
    },
);

const supportedActions: $ReadOnlyArray< CommonActionKey > = [
    CHANGE_CITY_NAME,
    CREATE_CITY,
    CREATE_SCHEDULED_ATTACK_ORDER,
    GET_CURRENT_STATE,
    UPGRADE_BUILDING,
];


export const handler: ProxyHandler
    = async ( event, ) => {

        const expectedErrorNames = [];

        const execution = async () => {

            logger.debug(
                {
                    interpolationValues: [
                        event,
                    ],
                    message: `received event: %o`,
                },
            );

            const eventValidationResult
                = validateServerRequestEvent(
                    {
                        event,
                    },
                );

            if ( eventValidationResult.errors.length > 0 ) {

                const errorReason = `event validation error: ${ JSON.stringify(
                    eventValidationResult.errors,
                ) }`;

                logger.warn(
                    {
                        message: errorReason,
                    },
                );

                return generateRequestRejectionResponse(
                    {
                        reason: errorReason,
                    },
                );

            }

            const eventValidationResultEvent = eventValidationResult.result;

            if ( eventValidationResultEvent == null ) {

                throw errorCreators.unexpected(
                    {
                        message:  `missing event`,
                    },
                );

            }

            const {
                connectionId,
                serverRequest,
                username,
            } = eventValidationResultEvent;

            const {
                action, worldId,
            } = serverRequest;

            const {
                playerId,
            } = action.payload;

            if ( playerId !== username ) {

                const errorReason = `username '${ username }'`
                    + ` does not match the playerId '${ playerId }'`;

                logger.warn(
                    {
                        message: errorReason,
                    },
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
                        connectionId,
                        logger,
                        redis,
                        response,
                        webSocketApiGateway,
                    },
                );

            };

            const {
                environment,
            } = config;

            if ( !supportedActions.includes(
                action.type,
            ) ) {

                return await handleUnsupportedAction(
                    {
                        action,
                        environment,
                        logger,
                        redis,
                        sendResponseBackToClient,
                        serverRequest,
                        worldId,
                    },
                );

            }

            if ( action.type === GET_CURRENT_STATE ) {

                return await handleGetCurrentStateAction(
                    {
                        action,
                        connectionId,
                        environment,
                        logger,
                        playerId,
                        redis,
                        sendResponseBackToClient,
                        worldId,
                    },
                );

            }

            const actionExecutionResult = await executeAction(
                {
                    action,
                    environment: config.environment,
                    logger,
                    redis,
                    worldId,
                },
            );

            const response = {
                ...actionExecutionResult,
                request: serverRequest,
            };

            await sendResponseBackToClient(
                {
                    response,
                },
            );

            return generateRequestAcceptedResponse(
                {
                    body: `Request accepted.`,
                },
            );

        };


        try {

            return await tryCatch(
                {
                    execution,
                    expectedErrorNames,
                },
            );

        } catch ( error ) {

            logger.error(
                {
                    error,
                    message: error.message,
                },
            );

            return generateRequestExecutionErrorResponse(
                {
                    reason: error.message,
                },
            );

        }

    };
