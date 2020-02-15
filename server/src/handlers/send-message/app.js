/**
 * @flow
 */

import type {APIGatewayProxyHandler} from '../../types';
import {createRedisClient} from '../../services/redis';
import {createApiGatewayClient} from '../../services/apiGateway';
import {sendStatusUpdate} from '../../utils';

const apiGateway = createApiGatewayClient();
const redis = createRedisClient();

export const handler: APIGatewayProxyHandler = async (event, context) => {
    const {connectionId} = event.requestContext;
    if (connectionId == null) {
        throw Error('missing connectionId');
    }
    try {
        const state = JSON.parse(await redis.get('state'));
        await sendStatusUpdate({apiGateway, redis, connectionId, state});
    } catch (error) {
        return {statusCode: 500, body: 'Message send error.'};
    }
    return {statusCode: 200, body: 'Message sent.'};
};
