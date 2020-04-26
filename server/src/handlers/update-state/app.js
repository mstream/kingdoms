// @flow

import {
    createConfig,
} from '../../config';
import {
    createDateProvider,
} from '../../clients/date-provider';
import {
    createLogger,
} from '../../../../common/src/logging';
import {
    createQueueConnector,
} from '../../connectors/queue';
import {
    createRedisClient,
} from '../../clients/redis';
import {
    createSqsClient,
} from '../../clients/sqs';
import {
    database,
} from '../../connectors/database';
import {
    executeAction,
} from '../../util';
import {
    executeTimeStep,
} from '../../../../common/src/state/modules/_children/cities/actions';
import {
    getCurrentTime,
} from '../../connectors/time';
import verror from 'verror';
import type {
    ScheduledHandler,
} from '../types';

const config = createConfig();
const logger = createLogger(
    {
        config,
    },
);
const dateProvider = createDateProvider();
const queue = createQueueConnector(
    {
        config,
    },
);
const redis = createRedisClient(
    {
        config,
    },
);
const sqs = createSqsClient();


export const ERROR_STATE_UPDATE: 'STATE_UPDATE' = `STATE_UPDATE`;

const updateWorldState = async ( {
    environment, time, worldId,
}: {
    environment: string,
    time: string,
    worldId: string
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

        await queue.sendWorldStateUpdate(
            {
                logger,
                payload: {
                    state: response.state,
                    time,
                    worldId,
                },
                sqs,
            },
        );

    } catch ( error ) {

        console.error(
            error.stack,
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
