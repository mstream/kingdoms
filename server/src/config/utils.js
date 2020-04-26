// @flow

import type {
    Config,
} from './types';

export const emptyConfig: Config = {
    apiGateway: {
        endpoint: ``,
    },
    cognito: {
        region    : ``,
        userPoolId: ``,
    },
    environment : ``,
    loggingLevel: ``,
    redis       : {
        host: ``,
        port: 0,
    },
    sqs: {
        queueUrls: {
            worldStateUpdate: ``,
        },
    },
};
