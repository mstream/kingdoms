/**
 * @flow
 */

import type {ApiGateway, Redis} from './types';
import {rootReducer} from './state/reducers/root';
import type {ServerAction, ServerResponse} from '../../common/src/actions';
import type {ServerState} from '../../common/src/state';

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

const serializeState = ({state}: { state: ServerState }): string => {
    return JSON.stringify(state);
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

        const reducerResult = rootReducer({action, state});

        if (reducerResult.errors.length > 0) {
            return {
                state,
                errors: reducerResult.errors,
                request: action,
            };
        }

        const newState = reducerResult.state;

        if (newState == null) {
            throw Error('new state missing');
        }

        const serializedState: string = serializeState({state: newState});

        // $FlowFixMe
        const result = await redis.multi().set('state', serializedState).exec();

        if (result != null) {
            return {
                state: newState,
                errors: [],
                request: action,
            };
        }
    }
    throw Error(`optimistic locking failed after ${optimisticLockingAttempts} attempts`);
};