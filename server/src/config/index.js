// @flow

import {
    emptyConfig,
} from './utils';
import type {
    Config,
} from './types';

export const stubConfig = {
    ...emptyConfig,
};

export const createConfig = (): Config => {

    if ( process.env.API_GATEWAY_ENDPOINT == null ) {

        throw Error(
            `API_GATEWAY_ENDPOINT is required`,
        );

    }

    if ( process.env.COGNITO_REGION == null ) {

        throw Error(
            `COGNITO_REGION is required`,
        );

    }

    if ( process.env.COGNITO_USER_POOL_ID == null ) {

        throw Error(
            `COGNITO_USER_POOL_ID is required`,
        );

    }

    if ( process.env.ENVIRONMENT == null ) {

        throw Error(
            `ENVIRONMENT is required`,
        );

    }

    if ( process.env.LOGGING_LEVEL == null ) {

        throw Error(
            `LOGGING_LEVEL is required`,
        );

    }

    if ( process.env.REDIS_HOST == null ) {

        throw Error(
            `REDIS_HOST is required`,
        );

    }

    if ( process.env.REDIS_PORT == null ) {

        throw Error(
            `REDIS_PORT is required`,
        );

    }

    return {
        apiGateway: {
            endpoint: process.env.API_GATEWAY_ENDPOINT,
        },
        cognito: {
            region    : process.env.COGNITO_REGION,
            userPoolId: process.env.COGNITO_USER_POOL_ID,
        },
        environment : process.env.ENVIRONMENT,
        loggingLevel: process.env.LOGGING_LEVEL,
        redis       : {
            host: process.env.REDIS_HOST,
            port: parseInt(
                process.env.REDIS_PORT,
            ),
        },
    };

};
