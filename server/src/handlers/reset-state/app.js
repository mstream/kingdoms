// @flow

import { createRedisClient } from '../../clients/redis';
import { executeAction } from '../../util';
import { resetState } from '../../../../common/src/actions';
import type { ProxyHandler } from '../types';
import { stringifyJson } from '../../../../common/src/util';
import { initialCommonState } from '../../../../common/src/state';

const redis = createRedisClient();

const stateResetSuccess = { statusCode: 200, body: 'State reset.' };


export const handler: ProxyHandler = async () => {
    try {
        await executeAction({ action: resetState(), redis });
    } catch (error) {
        console.error(error.stack);
        try {
            console.info('forcing state reset');
            const serializedState = stringifyJson({ value: initialCommonState });
            if (serializedState == null) {
                throw Error('state is missing');
            }
            await redis.set('state', serializedState);
            console.info(`successfully initialized the state: ${serializedState}`);
            return stateResetSuccess;
        } catch (error) {
            console.error(error.stack);
        }
        return { statusCode: 500, body: 'State reset error.' };
    }
    return stateResetSuccess;
};
