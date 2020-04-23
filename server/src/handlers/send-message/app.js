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
    validateEvent,
} from './validation';

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

const supportedActions: $ReadOnlyArray< CommonActionKey > = [
    CHANGE_CITY_NAME,
    CREATE_CITY,
    CREATE_SCHEDULED_ATTACK_ORDER,
    GET_CURRENT_STATE,
    UPGRADE_BUILDING,
];


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

            const errorReason = `username '${ username }'`
                + ` does not match the playerId '${ playerId }'`;

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
                    logger,
                    redis,
                    response,
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
