/**
 * @flow
 */

import {sendStatusUpdate} from '../../utils';
import {updateState} from '../../state';
import {createApiGatewayClient} from '../../services/apiGateway';
import {createRedisClient} from '../../services/redis';
import type {ScheduledHandler} from '../../types';

const apiGateway = createApiGatewayClient();
const redis = createRedisClient();

export const handler: ScheduledHandler = async (event, context) => {
    try {
        const state = JSON.parse(await redis.get('state'));
        const newState = updateState({state});
        await redis.set('state', JSON.stringify(newState));
        const connectionIds = await redis.smembers('connection-ids');
        const sendStatueUpdatePromises = connectionIds.map(connectionId => {
            return sendStatusUpdate({
                apiGateway,
                redis,
                connectionId,
                state: newState
            });
        });
        await Promise.all(sendStatueUpdatePromises);
    } catch (error) {
        console.error(error.stack);
    }
};