// @flow

export type RedisGetArgs = [string]
export type RedisGetResult = Promise< ?string >
export type RedisGet = ( ...RedisGetArgs ) => RedisGetResult;
export type MockRedisGet = JestMockFn< RedisGetArgs, RedisGetResult >

export type RedisKeysArgs = [string]
export type RedisKeysResult = Promise< $ReadOnlyArray< string > >;
export type RedisKeys = ( ...RedisKeysArgs ) => RedisKeysResult;
export type MockRedisKeys = JestMockFn< RedisKeysArgs, RedisKeysResult >;

export type RedisMultiArgs = []
export type RedisMultiResult = MultiRedis;
export type RedisMulti = ( ...RedisMultiArgs ) => RedisMultiResult;
export type MockRedisMulti = JestMockFn< RedisMultiArgs, RedisMultiResult >;

export type RedisSaddArgs = [string, string]
export type RedisSaddResult = Promise< number >;
export type RedisSadd = ( ...RedisSaddArgs ) => RedisSaddResult;
export type MockRedisSadd = JestMockFn< RedisSaddArgs, RedisSaddResult >;

export type RedisSetArgs = [string, string]
export type RedisSetResult = Promise< 'OK' | null >;
export type RedisSet = ( ...RedisSetArgs ) => RedisSetResult;
export type MockRedisSet = JestMockFn< RedisSetArgs, RedisSetResult >;

export type RedisSmembersArgs = [string]
export type RedisSmembersResult = Promise< $ReadOnlyArray< string > >;
export type RedisSmembers = ( ...RedisSmembersArgs ) => RedisSmembersResult;
export type MockRedisSmembers = JestMockFn< RedisSmembersArgs, RedisSmembersResult >;

export type RedisSremArgs = [string, string]
export type RedisSremResult = Promise< number >;
export type RedisSrem = ( ...RedisSremArgs ) => RedisSremResult;
export type MockRedisSrem = JestMockFn< RedisSremArgs, RedisSremResult >;

export type RedisUnwatchArgs = [string]
export type RedisUnwatchResult = Promise< 'OK' >;
export type RedisUnwatch = ( ...RedisUnwatchArgs ) => RedisUnwatchResult;
export type MockRedisUnwatch = JestMockFn< RedisUnwatchArgs, RedisUnwatchResult >;

export type RedisWatchArgs = [string]
export type RedisWatchResult = Promise< 'OK' >;
export type RedisWatch = ( ...RedisWatchArgs ) => RedisWatchResult;
export type MockRedisWatch = JestMockFn< RedisWatchArgs, RedisWatchResult >;

export type MultiRedisSadd = ( string, string ) => MultiRedis;
export type MultiRedisSet = ( string, string ) => MultiRedis;
export type MultiRedisSmembers = ( string ) => MultiRedis;
export type MultiRedisSrem = ( string, string ) => MultiRedis;

export type MultiRedis = {
    exec: () => Promise< ?$ReadOnlyArray< mixed > >,
    sadd: MultiRedisSadd,
    set: MultiRedisSet,
    smembers: MultiRedisSmembers,
    srem: MultiRedisSrem,
};

export type Redis = {
    get: RedisGet,
    keys: RedisKeys,
    multi: () => MultiRedis,
    sadd: RedisSadd,
    set: RedisSet,
    smembers: RedisSmembers,
    srem: RedisSrem,
    unwatch: RedisUnwatch,
    watch: RedisWatch,
};
