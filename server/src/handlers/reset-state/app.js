/**
 * @flow
 */

import {createRedisClient} from '../../services/redis';
import {executeAction} from '../../utils';
import {resetState} from '../../../../common/src/actions';
import {initialState} from '../../state/state';

const redis = createRedisClient();

const stateResetSuccess = {statusCode: 200, body: 'State reset.'};


export const handler = async () => {
    try {
        await executeAction({action: resetState(), redis});
    } catch (error) {
        console.error(error.stack);
        try {
            console.log('forcing state reset');
            await redis.set('state', JSON.stringify(initialState));
        } catch (error) {
            console.error(error.stack);
            return stateResetSuccess;
        }
        return {statusCode: 500, body: 'State reset error.'};
    }
    return stateResetSuccess;
};
