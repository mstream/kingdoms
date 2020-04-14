// @flow

import type {
    Config,
} from '../types';

export const stubConfig: Config = {
    apiGateway: {
        endpoint: `apiGatewayEndpoint1`,
    },
    cognito: {
        region    : `cognitoRegion1`,
        userPoolId: `cognitoUserPool1`,
    },
    environment : `env1`,
    loggingLevel: `info`,
    redis       : {
        host: `redisHost1`,
        port: 1111,
    },
};

export const createConfig: () => Config = () => {

    return stubConfig;

};
