// @flow

import type {
    MultiRedis, Redis,
} from './types';

export const dummyMultiRedis: MultiRedis = {
    exec: () => {

        return Promise.reject(
            Error(
                `unsupported`,
            ),
        );

    },
    sadd: () => {

        throw Error(
            `unsupported`,
        );

    },
    set: () => {

        throw Error(
            `unsupported`,
        );

    },
    smembers: () => {

        throw Error(
            `unsupported`,
        );

    },
    srem: () => {

        throw Error(
            `unsupported`,
        );

    },
};

export const dummyRedis: Redis = {
    get: () => {

        return Promise.reject(
            Error(
                `unsupported`,
            ),
        );

    },
    keys: () => {

        return Promise.reject(
            Error(
                `unsupported`,
            ),
        );

    },
    multi: () => {

        return dummyMultiRedis;

    },
    sadd: () => {

        return Promise.reject(
            Error(
                `unsupported`,
            ),
        );

    },
    set: () => {

        return Promise.reject(
            Error(
                `unsupported`,
            ),
        );

    },
    smembers: () => {

        return Promise.reject(
            Error(
                `unsupported`,
            ),
        );

    },
    srem: () => {

        return Promise.reject(
            Error(
                `unsupported`,
            ),
        );

    },
    unwatch: () => {

        return Promise.reject(
            Error(
                `unsupported`,
            ),
        );

    },
    watch: () => {

        return Promise.reject(
            Error(
                `unsupported`,
            ),
        );

    },
};
