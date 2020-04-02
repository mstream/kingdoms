// @flow

import { createRedisClient } from '../../clients/redis';
import type { ProxyHandler } from '../types';
import {
    initialCommonState,
    testCommonState,
} from '../../../../common/src/state';
import { database } from '../../connectors/database';
import { config } from '../../config';

const states = {
    initial: initialCommonState,
    test: testCommonState,
};

const redis = createRedisClient({ config });

const requestAccepted = {
    body: `State reset.`,
    statusCode: 200,
};

const requestExecutionError = {
    body: `State reset error.`,
    statusCode: 500,
};

export const handler: ProxyHandler = async (event, context) => {
    const stateType = event.body;

    if (stateType == null) {
        return {
            statusCode: 500,
            body: `State type missing. Supported values: ${JSON.stringify(
                Object.keys(states),
            )}`,
        };
    }

    const state = states[stateType];

    if (state == null) {
        return {
            statusCode: 500,
            body: `Unsupported test type. Supported values: ${JSON.stringify(
                Object.keys(states),
            )}`,
        };
    }

    try {
        console.info(`forcing state reset`);
        await database.setState({
            environment: config.environment,
            redis,
            state,
            worldId: 'default',
        });
        return requestAccepted;
    } catch (error) {
        console.error(error.stack);
        return requestExecutionError;
    }
};
