// @flow

import { createRedisClient } from '../../clients/redis';
import type { ProxyHandler } from '../types';
import { addConnection } from '../../connectors/database';
import { config } from '../../config';

const redis = createRedisClient();

export const handler: ProxyHandler = async (event, context) => {
    try {
        const connectionId = event.requestContext.connectionId;

        if (connectionId == null) {
            throw Error('connectionId is missing');
        }

        await addConnection({
            connectionId,
            environment: config.environment,
            redis,
        });
    } catch (error) {
        console.error(error.stack);
        return { statusCode: 500, body: `Connection error.` };
    }
    return { statusCode: 200, body: `Connected.` };
};
