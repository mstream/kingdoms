// @flow

export type Config = {
    webSocketApiGateway: {
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
    sqs: {
        queueUrls: {
            worldStateUpdate: string,
        }
    }
};
