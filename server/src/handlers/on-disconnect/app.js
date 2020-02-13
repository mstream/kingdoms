/**
 * @flow
 */

import Redis from 'ioredis';
import type {APIGatewayProxyHandler} from '../types';

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

export const handler: APIGatewayProxyHandler = async (event, context) => {
    const {connectionId} = event.requestContext;
    try {
        await redis.srem('connection-ids', connectionId);
    } catch (error) {
        console.error(error.stack);
        return {statusCode: 500, body: 'Disconnect error.'};
    }
    return {statusCode: 200, body: 'Disconnected.'};
};
