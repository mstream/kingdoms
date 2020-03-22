// @flow

export type Config = {
    cognito: {
        region: string,
        userPoolId: string,
    },
    environment: string,
    redis: {
        host: string,
        port: number,
    },
};