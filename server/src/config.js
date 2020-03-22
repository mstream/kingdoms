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

const createConfig = (): Config => {
    if (process.env.COGNITO_REGION == null) {
        throw Error('COGNITO_REGION required');
    }

    if (process.env.COGNITO_USER_POOL_ID == null) {
        throw Error('COGNITO_USER_POOL_ID required');
    }


    if (process.env.ENVIRONMENT == null) {
        throw Error('ENVIRONMENT required');
    }

    if (process.env.REDIS_HOST == null) {
        throw Error('REDIS_HOST required');
    }

    if (process.env.REDIS_PORT == null) {
        throw Error('REDIS_PORT required');
    }

    return {
        cognito: {
            region: process.env.COGNITO_REGION,
            userPoolId: process.env.COGNITO_USER_POOL_ID,
        },
        environment: process.env.ENVIRONMENT,
        redis: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
        },
    };
};

export const config = createConfig();
