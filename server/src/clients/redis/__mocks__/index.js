// @flow

import type {
    MockRedisDel,
    MockRedisGet,
    MockRedisKeys,
    MockRedisMulti,
    MockRedisSadd,
    MockRedisSet,
    MockRedisSmembers,
    MockRedisSrem,
    MockRedisUnwatch,
    MockRedisWatch,
    Redis,
} from '../types';

export const mockDel: MockRedisDel = jest.fn(
    () => {

        return Promise.reject(
            Error(
                `mockDel`,
            ),
        );

    },
);

export const mockGet: MockRedisGet = jest.fn(
    () => {

        return Promise.reject(
            Error(
                `mockGet`,
            ),
        );

    },
);

export const mockKeys: MockRedisKeys = jest.fn(
    () => {

        return Promise.reject(
            Error(
                `mockKeys`,
            ),
        );

    },
);

export const mockMulti: MockRedisMulti = jest.fn(
    () => {

        throw Error(
            `mockMulti`,
        );

    },
);

export const mockSadd: MockRedisSadd = jest.fn(
    () => {

        return Promise.reject(
            Error(
                `mockSadd`,
            ),
        );

    },
);

export const mockSet: MockRedisSet = jest.fn(
    () => {

        return Promise.reject(
            Error(
                `mockSet`,
            ),
        );

    },
);

export const mockSmembers: MockRedisSmembers = jest.fn(
    () => {

        return Promise.reject(
            Error(
                `mockSmembers`,
            ),
        );

    },
);

export const mockSrem: MockRedisSrem = jest.fn(
    () => {

        return Promise.reject(
            Error(
                `mockSrem`,
            ),
        );

    },
);

export const mockUnwatch: MockRedisUnwatch = jest.fn(
    () => {

        return Promise.reject(
            Error(
                `mockUnwatch`,
            ),
        );

    },
);

export const mockWatch: MockRedisWatch = jest.fn(
    () => {

        return Promise.reject(
            Error(
                `mockWatch`,
            ),
        );

    },
);

export const createRedisClient: () => Redis = () => {

    return {
        del     : mockDel,
        get     : mockGet,
        keys    : mockKeys,
        multi   : mockMulti,
        sadd    : mockSadd,
        set     : mockSet,
        smembers: mockSmembers,
        srem    : mockSrem,
        unwatch : mockUnwatch,
        watch   : mockWatch,
    };

};
