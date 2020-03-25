// @flow

import { createRedisClient } from '../../clients/redis';
import type { ProxyHandler } from '../types';
import { addConnection } from '../../connectors/database';
import { config } from '../../config';

const redis = createRedisClient({ config });

const requestExecutionError = {
    body: `Connection error.`,
    statusCode: 500,
};

const requestAccepted = {
    body: `Connected.`,
    statusCode: 200,
};

export const handler: ProxyHandler = async (event, context) => {
    try {
        const connectionId = event.requestContext.connectionId;

        if (connectionId == null) {
            throw Error(`connectionId is missing`);
        }

        await addConnection({
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
