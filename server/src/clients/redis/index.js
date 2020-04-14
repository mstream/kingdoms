// @flow

import RedisClient from 'ioredis';
import type {
    Config,
} from '../../config/types';
import type {
    MockRedisGet,
    MockRedisKeys, MockRedisMulti,
    MockRedisSadd,
    MockRedisSet,
    MockRedisSmembers, MockRedisSrem,
    MockRedisUnwatch,
    MockRedisWatch,
    Redis,
} from './types';

// $FlowFixMe
export const mockGet: MockRedisGet = null;

// $FlowFixMe
export const mockKeys: MockRedisKeys = null;

// $FlowFixMe
export const mockMulti: MockRedisMulti = null;

// $FlowFixMe
export const mockSadd: MockRedisSadd = null;

// $FlowFixMe
export const mockSet: MockRedisSet = null;

// $FlowFixMe
export const mockSmembers: MockRedisSmembers = null;

// $FlowFixMe
export const mockSrem: MockRedisSrem = null;

// $FlowFixMe
export const mockUnwatch: MockRedisUnwatch = null;

// $FlowFixMe
export const mockWatch: MockRedisWatch = null;


export const createRedisClient = (
    {
        config,
    }: { config: Config },
): Redis => {

    return new RedisClient(
        {
            host: config.redis.host,
            port: config.redis.port,
        },
    );

};
