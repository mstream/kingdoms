/**
 * @flow
 */

import Redis from 'ioredis';

export const createRedisClient = () => {
    return new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    });
};
