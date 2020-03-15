// @flow

import { createRedisClient } from '../../clients/redis';
import type { ProxyHandler } from '../types';
import { stringifyJson } from '../../../../common/src/util';
import {
    initialCommonState,
    testCommonState,
} from '../../../../common/src/state';

const states = {
    'initial': initialCommonState,
    'test': testCommonState,
};

const redis = createRedisClient();

const stateResetSuccess = { statusCode: 200, body: 'State reset.' };

export const handler: ProxyHandler = async (event, context) => {
    const stateType = event.body;

    if (stateType == null) {
        return {
            statusCode: 500,
            body: `State type missing. Supported values: ${JSON.stringify(Object.keys(states))}`,
        };
    }

    const state = states[stateType];

    if (state == null) {
        return {
            statusCode: 500,
            body: `Unsupported test type. Supported values: ${JSON.stringify(Object.keys(states))}`,
        };
    }

    try {
        console.info('forcing state reset');
        const serializedState = stringifyJson({ value: state });
        if (serializedState == null) {
            throw Error('state is missing');
        }
        await redis.set('state', serializedState);
        console.info(`successfully initialized the state: ${serializedState}`);
        return stateResetSuccess;
    } catch (error) {
        console.error(error.stack);
        return { statusCode: 500, body: 'State reset error.' };
    }
};
