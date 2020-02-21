/**
 * @flow
 */

import type {ApiGateway, Redis} from './types';
import {rootReducer} from './state/reducers/root';
import type {ServerAction, ServerResponse} from '../../common/src/actions';

const optimisticLockingAttempts = 3;

export const sendResponse = async ({
                                       apiGateway,
                                       redis,
                                       connectionId,
                                       response,
                                   }: {
    apiGateway: ApiGateway,
    redis: Redis,
    connectionId: string,
    response: ServerResponse,
}): Promise<void> => {
    try {
        // $FlowFixMe
        await apiGateway
            .postToConnection({
                ConnectionId: connectionId,
                Data: JSON.stringify(response),
            })
            .promise();
    } catch (error) {
        if (error.statusCode === 410) {
            console.log(`Found stale connection, deleting ${connectionId}`);
            try {
                // $FlowFixMe
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

export const executeAction = async ({action, redis}: { action: ServerAction, redis: Redis }): Promise<ServerResponse> => {
    for (let i = 0; i < optimisticLockingAttempts; i++) {
        // $FlowFixMe
        await redis.watch('state');
        // $FlowFixMe
        const state = JSON.parse(await redis.get('state'));
        if (state == null) {
            throw Error('state is not initialized');
        }
        const newState = rootReducer(state, action);
        // $FlowFixMe
        const result = await redis.multi().set('state', JSON.stringify(newState)).exec();
        if (result != null) {
            return {
                request: action,
                errors: [],
                state: newState,
            };
        }
    }
    throw Error(`optimistic locking failed after ${optimisticLockingAttempts} attempts`);
};