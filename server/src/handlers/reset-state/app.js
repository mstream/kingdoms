// @flow

import { createRedisClient } from '../../clients/redis';
import type { ProxyHandler } from '../types';
import {
    initialCommonState,
    testCommonState,
} from '../../../../common/src/state';
import { setState } from '../../connectors/database';
import { config } from '../../config';

const states = {
    'initial': initialCommonState,
    'test': testCommonState,
};

const redis = createRedisClient({config});

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
        await setState({
            environment: config.environment,
            redis,
            state,
        });
        return stateResetSuccess;
    } catch (error) {
        console.error(error.stack);
        return { statusCode: 500, body: 'State reset error.' };
    }
};
