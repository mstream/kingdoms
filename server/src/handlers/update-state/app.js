// @flow

import { executeAction, sendResponse } from '../../util';
import { createApiGatewayClient } from '../../clients/api-gateway';
import { createRedisClient } from '../../clients/redis';
import { executeTimeStep } from '../../../../common/src/state/actions';
import type { ScheduledHandler } from '../types';
import { config } from '../../config';

const apiGateway = createApiGatewayClient();
const redis = createRedisClient({config});

export const handler: ScheduledHandler = async (event, context) => {
    try {
        const response = await executeAction({
            action: executeTimeStep({ time: new Date().toISOString() }),
            environment: config.environment,
            redis,
        });

        const connectionIds = await redis.smembers('connection-ids');

        const sendStatueUpdatePromises = connectionIds.map(connectionId => {
            return sendResponse({
                apiGateway,
                redis,
                connectionId,
                response,
            });
        });

        await Promise.all(sendStatueUpdatePromises);
    } catch (error) {
        console.error(error.stack);
    }
};
