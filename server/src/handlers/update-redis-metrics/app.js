// @flow

import {
    createCloudWatchClient,
} from '../../clients/cloud-watch';
import {
    createConfig,
} from '../../config';
import {
    createLogger,
} from '../../../../common/src/logging';
import {
    createMetricsConnector,
} from '../../connectors/metrics';
import {
    createRedisClient,
} from '../../clients/redis';
import {
    database,
} from '../../connectors/database';
import {
    tryCatch,
} from '../../errors';
import type {
    MetricDataItem,
} from '../../clients/cloud-watch/types';
import type {
    ScheduledHandler,
} from '../types';

const config = createConfig();

const logger = createLogger(
    {
        config,
    },
);

const cloudWatch = createCloudWatchClient();

const redis = createRedisClient(
    {
        config,
    },
);

const metrics = createMetricsConnector(
    {
        config,
    },
);

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

            const data: MetricDataItem = {
                Dimensions: [],
                MetricName: `WorldsCount`,
                Unit      : `Count`,
                Value     : worldIds.length,
            };

            await metrics.sendMetric(
                {
                    cloudWatch,
                    data,
                    group: `Redis`,
                    logger,
                },
            );

        };

        return await tryCatch(
            {
                execution,
                expectedErrorNames,
            },
        );

    };
