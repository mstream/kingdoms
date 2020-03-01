// @flow

import { createRedisClient } from '../../services/redis';
import type {ProxyHandler} from '../../types';

const redis = createRedisClient();

export const handler: ProxyHandler = async (event, context) => {
    const connectionId = event.requestContext.connectionId;

    try {
        await redis.srem('connection-ids', connectionId);
    } catch (error) {
        console.error(error.stack);
        return { statusCode: 500, body: 'Disconnect error.' };
    }
    return { statusCode: 200, body: 'Disconnected.' };
};
