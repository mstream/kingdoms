/**
 * @flow
 */

import Redis from "ioredis";

export const createClient = () => {
    return new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    });
};
