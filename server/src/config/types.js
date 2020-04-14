// @flow

export type Config = {
    apiGateway: {
        endpoint: string,
    },
    cognito: {
        region: string,
        userPoolId: string,
    },
    environment: string,
    loggingLevel: string,
    redis: {
        host: string,
        port: number,
    },
};
