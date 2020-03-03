// @flow

import {createRedisClient} from '../../clients/redis';
import {executeAction} from '../../utils';
import {resetState} from '../../../../common/src/actions';
import {initialServerState} from '../../state/state';
import type {ProxyHandler} from '../types';
import {stringifyJson} from '../../../../common/src/util';

const redis = createRedisClient();

const stateResetSuccess = {statusCode: 200, body: 'State reset.'};


export const handler: ProxyHandler = async () => {
    try {
        await executeAction({action: resetState(), redis});
    } catch (error) {
        console.error(error.stack);
        try {
            console.info('forcing state reset');
            const serializedState = stringifyJson({value: initialServerState});
            if (serializedState == null) {
                throw Error('state is missing');
            }
            await redis.set('state', serializedState);
        } catch (error) {
            console.error(error.stack);
            return stateResetSuccess;
        }
        return {statusCode: 500, body: 'State reset error.'};
    }
    return stateResetSuccess;
};
