// @flow

import {
    emptyConfig,
} from './utils';
import {
    getEnvironmentalVariable,
} from '../../../common/src/utils';
import type {
    Config,
} from './types';

export const stubConfig = {
    ...emptyConfig,
};

export const createConfig = (): Config => {

    return {
        cognito: {
            region: getEnvironmentalVariable(
                {
                    name: `COGNITO_REGION`,
                },
            ),
            userPoolId: getEnvironmentalVariable(
                {
                    name: `COGNITO_USER_POOL_ID`,
                },
            ),
        },
        environment: getEnvironmentalVariable(
            {
                name: `ENVIRONMENT`,
            },
        ),
        loggingLevel: getEnvironmentalVariable(
            {
                name: `LOGGING_LEVEL`,
            },
        ),
        redis: {
            host: getEnvironmentalVariable(
                {
                    name: `REDIS_HOST`,
                },
            ),
            port: parseInt(
                getEnvironmentalVariable(
                    {
                        name: `REDIS_PORT`,
                    },
                ),
            ),
        },
        sqs: {
            queueUrls: {
                worldStateUpdate: getEnvironmentalVariable(
                    {
                        name: `WORLD_STATE_UPDATE_QUEUE_URL`,
                    },
                ),
            },
        },
        webSocketApiGateway: {
            endpoint: getEnvironmentalVariable(
                {
                    name: `WEBSOCKET_API_GATEWAY_ENDPOINT`,
                },
            ),
        },
    };

};
