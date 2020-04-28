// @flow

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
    database,
} from '../../connectors/database';

import verror from 'verror';

import {
    executeTimeStep,
} from '../../../../common/src/state/modules/_children/cities/actions';
import {
    sendResponse,
} from '../../util';
import {
    validateStateUpdateEvent,
} from './validation';
import type {
    ExecuteTimeResponseRequest,
    ServerResponse,
} from '../../../../common/src/types';
import type {
    SqsHandler,
} from '../types';
import type {
    WorldStateUpdatePayload,
} from '../../connectors/queue/send-world-state-update/types';

const ERROR_STATE_BROADCAST: 'ERROR_STATE_BROADCAST' = `ERROR_STATE_BROADCAST`;
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

const sendStateUpdate = async ( {
    connectionId, response,
}: $ReadOnly< {|
    connectionId: ?string,
    response: ServerResponse
|} >, ): Promise< void > => {

    try {

        if ( connectionId == null ) {

            return;

        }

        return sendResponse(
            {
                apiGateway,
                connectionId,
                logger,
                redis,
                response,
            },
        );

    } catch ( error ) {

        console.error(
            error.stack,
        );

    }

};

const broadcastStateUpdate = async (
    {
        environment,
        update,
    }: $ReadOnly< {|
        environment: string,
        update: WorldStateUpdatePayload,
    |} >,
): Promise< void > => {

    try {

        const {
            state, time, worldId,
        } = update;

        logger.debug(
            `broadcasting state update of world '%s'`,
            worldId,
        );

        const request: ExecuteTimeResponseRequest = {
            action: executeTimeStep(
                {
                    time,
                },
            ),
            worldId,
        };

        const response: ServerResponse = {
            errors: [],
            request,
            state,
        };

        const playerIds = await database.playersByWorld.getAll(
            {
                key: {
                    environment,
                    worldId,
                },
                logger,
                redis,
            },
        );

        const connectionIdPromises = playerIds.map(
            (
                playerId: string,
            ) => {

                return database.connectionByPlayer.get(
                    {
                        key: {
                            environment,
                            playerId,
                        },
                        logger,
                        redis,
                    },
                );

            },
        );

        const connectionIds: $ReadOnlyArray< ?string > = await Promise.all(
            connectionIdPromises,
        );

        const sendStateUpdatePromises: $ReadOnlyArray< Promise< void >, >
            = connectionIds.map(
                (
                    connectionId: ?string,
                ) => {

                    return sendStateUpdate(
                        {
                            connectionId,
                            response,
                        },
                    );

                },
                [],
            );

        await Promise.all(
            sendStateUpdatePromises,
        );


    } catch ( error ) {

        console.error(
            error.stack,
        );

    }

};

export const handler: SqsHandler = async ( event, ) => {

    try {

        logger.debug(
            `received event: %o`,
            event,
        );

        const {
            environment,
        } = config;

        const eventValidationResult = validateStateUpdateEvent(
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

            return;

        }

        const updates: ?$ReadOnlyArray< WorldStateUpdatePayload >
            = eventValidationResult.result;

        if ( updates == null ) {

            throw Error(
                `missing event validation result`,
            );

        }

        const broadcastStateUpdatePromises = updates.map(
            (
                update: WorldStateUpdatePayload,
            ) => {

                return broadcastStateUpdate(
                    {
                        environment,
                        update,
                    },
                );

            },
        );

        await Promise.all(
            broadcastStateUpdatePromises,
        );

    } catch ( error ) {

        throw new verror.VError(
            {
                cause: error,
                name : ERROR_STATE_BROADCAST,
            },
        );

    }

};
