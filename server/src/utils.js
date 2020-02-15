/**
 * @flow
 */

import {initialState} from './state';
import type {ServerState} from '../../common/src/types';

// $FlowFixMe
export const sendStatusUpdate = async ({apiGateway, redis, connectionId, state}: { apiGateway: mixed, redis: mixed, connectionId: string, state: ServerState }): Promise<void> => {
    try {
        if (state == null) {
            state = initialState;
            await redis.set('state', JSON.stringify(state));
        }
        await apiGateway.postToConnection({
            ConnectionId: connectionId,
            Data: JSON.stringify({type: 'STATE_UPDATE', payload: state}),
        }).promise();
    } catch (error) {
        if (error.statusCode === 410) {
            console.log(`Found stale connection, deleting ${connectionId}`);
            try {
                await redis.srem('connection-ids', connectionId);
            } catch (error) {
                console.error(error.stack);
            }
        } else {
            console.error(error.stack);
        }
        throw error;
    }
};
