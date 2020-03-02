// @flow

import RedisClient from 'ioredis';

type Get = (string) => Promise<?string>;
type Sadd = (string, string) => Promise<number>;
type Set = (string, string) => Promise<void>;
type Smembers = (string) => Promise<$ReadOnlyArray<string>>;
type Srem = (string, string) => Promise<number>;
type Watch = (string) => Promise<void>;

type MultiGet = (string) => MultiRedis;
type MultiSadd = (string, string) => MultiRedis;
type MultiSet = (string, string) => MultiRedis;
type MultiSmembers = (string) => MultiRedis;
type MultiSrem = (string, string) => MultiRedis;

type MultiRedis = {
    exec: () => Promise<?$ReadOnlyArray<mixed>>,
    get: MultiGet,
    sadd: MultiSadd,
    set: MultiSet,
    smembers: MultiSmembers,
    srem: MultiSrem,
};

export type Redis = {
    get: Get,
    multi: () => MultiRedis,
    sadd: Sadd,
    set: Set,
    smembers: Smembers,
    srem: Srem,
    watch: Watch,
};

export const createRedisClient = (): Redis => {
    return new RedisClient({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    });
};
