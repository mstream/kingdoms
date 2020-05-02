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
import {
    tryCatch,
} from '../../errors';
import type {
    Logger,
} from '../../../../common/src/logging/types';
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


const updateWorldState = async (
    {
        environment,
        logger,
        time,
        worldId,
    }: $ReadOnly< {|
        environment: string,
        logger: Logger,
        time: string,
        worldId: string
    |} >,
): Promise< void > => {

    try {

        const actionExecutionResult
            = await executeAction(
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
                    state: actionExecutionResult.state,
                    time,
                    worldId,
                },
                sqs,
            },
        );

    } catch ( error ) {

        logger.error(
            {
                error,
                message: `unexpected error`,
            },
        );

    }

};

export const handler: ScheduledHandler
    = async () => {

        const expectedErrorNames = [];

        const execution = async () => {

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

            const worldStateUpdatePromises: $ReadOnlyArray< Promise< void >, >
                = worldIds.map(
                    (
                        worldId: string,
                    ) => {

                        return updateWorldState(
                            {
                                environment,
                                logger,
                                time,
                                worldId,
                            },
                        );

                    },
                );

            await Promise.all(
                worldStateUpdatePromises,
            );

        };

        return await tryCatch(
            {
                execution,
                expectedErrorNames,
            },
        );

    };
