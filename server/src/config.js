// @flow

type Config = {
    environment: string,
    redis: {
        host: string,
        port: number,
    },
};

const createConfig = (): Config => {
    if (process.env.ENVIRONMENT == null) {
        throw Error('ENVIRONMENT required');
    }

    if (process.env.REDIS_HOST == null) {
        throw Error('REDIS_HOST required');
    }

    if (process.env.REDIS_PORT == null) {
        throw Error('REDIS_PORT required');
    }

    return  {
        environment: process.env.ENVIRONMENT,
        redis: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
        },
    }
};

export const config = createConfig();
