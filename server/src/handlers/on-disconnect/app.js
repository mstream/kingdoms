// @flow

import { createRedisClient } from '../../clients/redis';
import type {ProxyHandler} from '../types';

const redis = createRedisClient();

export const handler: ProxyHandler = async (event, context) => {
    try {
        const connectionId = event.requestContext.connectionId;

        if (connectionId == null) {
            throw Error('connectionId is missing');
        }

        await redis.srem('connection-ids', connectionId);
    } catch (error) {
        console.error(error.stack);
        return { statusCode: 500, body: 'Disconnect error.' };
    }
    return { statusCode: 200, body: 'Disconnected.' };
};
