// @flow

import RedisClient from 'ioredis';
import { config } from '../config';

type Get = (string) => Promise<?string>;
type Sadd = (string, string) => Promise<number>;
type Set = (string, string) => Promise<'OK'|null>;
type Smembers = (string) => Promise<$ReadOnlyArray<string>>;
type Srem = (string, string) => Promise<number>;
type Unwatch = (string) => Promise<'OK'>;
type Watch = (string) => Promise<'OK'>;

type MultiSadd = (string, string) => MultiRedis;
type MultiSet = (string, string) => MultiRedis;
type MultiSmembers = (string) => MultiRedis;
type MultiSrem = (string, string) => MultiRedis;

type MultiRedis = {
    exec: () => Promise<?$ReadOnlyArray<mixed>>,
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
    unwatch: Unwatch,
    watch: Watch,
};

export const createRedisClient = (): Redis => {
    return new RedisClient({
        host: config.redis.host,
        port: config.redis.port,
    });
};
