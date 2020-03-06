// @flow

import {executeAction, sendResponse} from '../../utils';
import {createApiGatewayClient} from '../../clients/api-gateway';
import {createRedisClient} from '../../clients/redis';
import {executeTimeStep} from '../../../../common/src/actions';
import type {ScheduledHandler} from '../types';

const apiGateway = createApiGatewayClient();
const redis = createRedisClient();

export const handler: ScheduledHandler = async (event, context) => {
    try {
        const response = await executeAction({
            action: executeTimeStep({time: new Date().toISOString()}),
            redis
        });

        const connectionIds = await redis.smembers('connection-ids');

        const sendStatueUpdatePromises = connectionIds.map(connectionId => {
            return sendResponse({
                apiGateway,
                redis,
                connectionId,
                response
            });
        });

        await Promise.all(sendStatueUpdatePromises);
    } catch (error) {
        console.error(error.stack);
    }
};
