/**
 * @flow
 */

import {sendStatusUpdate} from '../../utils';
import {createApiGatewayClient} from '../../services/apiGateway';
import {createRedisClient} from '../../services/redis';
import type {ScheduledHandler} from '../../types';
import {updateState} from '../../state/actions';
import {rootReducer} from '../../state/reducers/root';

const apiGateway = createApiGatewayClient();
const redis = createRedisClient();

export const handler: ScheduledHandler = async (event, context) => {
    try {
        const state = JSON.parse(await redis.get('state'));
        if (state == null) {
            console.error('state is not initialized');
            return;
        }
        const newState = rootReducer(state, updateState({time: new Date().toISOString()}));
        await redis.set('state', JSON.stringify(newState));
        const connectionIds = await redis.smembers('connection-ids');
        const sendStatueUpdatePromises = connectionIds.map(connectionId => {
            return sendStatusUpdate({
                apiGateway,
                redis,
                connectionId,
                state: newState,
            });
        });
        await Promise.all(sendStatueUpdatePromises);
    } catch (error) {
        console.error(error.stack);
    }
};
