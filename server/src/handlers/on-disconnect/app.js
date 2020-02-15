/**
 * @flow
 */

import type {APIGatewayProxyHandler} from '../../types';
import {createRedisClient} from '../../services/redis';

const redis = createRedisClient();

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
