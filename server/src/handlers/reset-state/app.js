/**
 * @flow
 */

import {createRedisClient} from '../../services/redis';
import {rootReducer} from '../../state/reducers/root';
import {resetState} from '../../state/actions';

const redis = createRedisClient();

export const handler = async () => {
    try {
        const state = rootReducer(undefined, resetState());
        await redis.set('state', JSON.stringify(state));
    } catch (error) {
        console.error(error.stack);
        return {statusCode: 500, body: 'State reset error.'};
    }
    return {statusCode: 200, body: 'State reset.'};
};
