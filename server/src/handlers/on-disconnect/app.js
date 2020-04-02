// @flow

import { createRedisClient } from '../../clients/redis';
import type { ProxyHandler } from '../types';
import { database } from '../../connectors/database';
import { config } from '../../config';

const requestExecutionError = {
    body: `Connection error.`,
    statusCode: 500,
};

const requestAccepted = {
    body: `Connected.`,
    statusCode: 200,
};

const redis = createRedisClient({ config });

export const handler: ProxyHandler = async (event, context) => {
    try {
        const connectionId = event.requestContext.connectionId;

        if (connectionId == null) {
            throw Error(`connectionId is missing`);
        }

        await database.removeConnection({
            connectionId,
            environment: config.environment,
            redis,
        });
    } catch (error) {
        console.error(error.stack);
        return requestExecutionError;
    }

    return requestAccepted;
};
