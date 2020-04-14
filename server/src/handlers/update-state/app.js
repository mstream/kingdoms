// @flow

import {
    executeAction, sendResponse,
} from '../../util';
import {
    createApiGatewayClient,
} from '../../clients/api-gateway';
import {
    createRedisClient,
} from '../../clients/redis';
import {
    executeTimeStep,
} from '../../../../common/src/state/modules/cities/actions';
import type {
    ScheduledHandler,
} from '../types';
import {
    database,
} from '../../connectors/database';
import {
    createConfig,
} from '../../config';
import verror from 'verror';
import type {
    Redis,
} from '../../clients/redis/types';
import {
    createDateProvider,
} from '../../clients/date-provider';
import {
    getCurrentTime,
} from '../../connectors/time';
import {
    createLogger,
} from '../../../../common/src/logging';
import type {
    Logger,
} from '../../../../common/src/logging/types';

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
const dateProvider = createDateProvider();
const redis = createRedisClient(
    {
        config,
    },
);

export const ERROR_STATE_UPDATE: 'STATE_UPDATE' = `STATE_UPDATE`;

const updateWorldState = async ( {
    environment,
    logger,
    redis,
    time,
    worldId,
}: {
    environment: string,
    logger: Logger,
    redis: Redis,
    time: string,
    worldId: string,
}, ): Promise< void > => {

    try {

        const response = await executeAction(
            {
                action: executeTimeStep(
                    {
                        time,
                    },
                ),
                environment,
                logger,
                redis,
                worldId,
            },
        );

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

        const sendStatueUpdatePromises: $ReadOnlyArray< Promise< void >, > = connectionIds.reduce(
            (
                sendStatueUpdatePromises, connectionId: ?string,
            ) => {

                return connectionId == null
                    ? sendStatueUpdatePromises
                    : [
                        ...sendStatueUpdatePromises,
                        sendResponse(
                            {
                                apiGateway,
                                connectionId,
                                redis,
                                response,
                            },
                        ),
                    ];

            },
            [],
        );

        await Promise.all(
            sendStatueUpdatePromises,
        );

    } catch ( error ) {

        throw verror.VError(
            {
                cause: error,
                name : ERROR_STATE_UPDATE,
            },
        );

    }

};

export const handler: ScheduledHandler = async () => {

    try {

        const {
            environment,
        } = config;

        const worldIds = await database.worlds.getAll(
            {
                key: {
                    environment,
                },
                logger,
                redis,
            },
        );

        const time = getCurrentTime(
            {
                dateProvider,
            },
        );

        const worldStateUpdatePromises: $ReadOnlyArray< Promise< void >, > = worldIds.map(
            (
                worldId: string,
            ) => {

                return updateWorldState(
                    {
                        environment,
                        logger,
                        redis,
                        time,
                        worldId,
                    },
                );

            },
        );

        await Promise.all(
            worldStateUpdatePromises,
        );

    } catch ( error ) {

        throw verror.VError(
            {
                cause: error,
                name : ERROR_STATE_UPDATE,
            },
        );

    }

};
