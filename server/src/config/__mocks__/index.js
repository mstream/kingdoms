// @flow

import type {
    Config,
} from '../types';

export const stubConfig: Config = {
    cognito: {
        region    : `cognitoRegion1`,
        userPoolId: `cognitoUserPool1`,
    },
    environment   : `env1`,
    httpApiGateway: {
        endpoint: `httpApiGatewayEndpoint1`,
    },
    loggingLevel: `info`,
    redis       : {
        host: `redisHost1`,
        port: 1111,
    },
    sqs: {
        queueUrls: {
            worldStateUpdate: `worldStateUpdateUrl1`,
        },
    },
    webSocketApiGateway: {
        endpoint: `webSocketApiGatewayEndpoint1`,
    },
};

export const createConfig: () => Config = () => {

    return stubConfig;

};
