/**
 * @flow
 */

import type {ApiGateway, Redis} from './types';
import {rootReducer} from './state/reducers/root';
import type {ServerAction, ServerResponse} from '../../common/src/actions';
import {validateUpgradeBuildingAction} from './state/action-validators/upgrade-building';

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

        const errors = [];

        switch (action.type) {
            case 'UPGRADE_BUILDING': {
                errors.push(...validateUpgradeBuildingAction({action, state}));
                break;
            }
            case 'EXECUTE_TIME_STEP':
            case 'GET_CURRENT_STATE':
            case 'RESET_STATE': {
                break;
            }
            default: {
                throw Error(`no validator for ${action.type} action type`);
            }
        }

        if (errors.length > 0) {
            return {
                request: action,
                errors,
                state,
            };
        }

        const newState = rootReducer({action, state});
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