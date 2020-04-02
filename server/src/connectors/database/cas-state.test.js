// @flow

import { dummyMultiRedis, dummyRedisClient } from '../../clients/redis';
import type { CommonState } from '../../../../common/src/state/modules/types';
import { emptyCommonState } from '../../../../common/src/state/modules/state';
import verror from 'verror';
import { casState } from './cas-state';

describe('casState', () => {
    it('sets the state if state has not changed before the beginning of the state transformation operation', async () => {
        const state: CommonState = {
            ...emptyCommonState,
            time: 'time1',
        };

        const validateState = jest.fn(({ toValidate }) => {
            return state;
        });

        const transformedState = {
            ...emptyCommonState,
            time: 'time2',
        };

        const stateTransformer = jest.fn(() => {
            return {
                errors: [],
                state: transformedState,
            };
        });

        const environment = 'env1';
        const worldId = 'world1';

        const exec = jest.fn(() => {
            return Promise.resolve(['OK']);
        });

        const set = jest.fn(() => {
            return {
                ...dummyMultiRedis,
                exec,
            };
        });

        const multi = jest.fn(() => {
            return {
                ...dummyMultiRedis,
                set,
            };
        });

        const redis = {
            ...dummyRedisClient,
            get: jest.fn(() => {
                return Promise.resolve(JSON.stringify(state));
            }),
            multi,
            unwatch: jest.fn(() => {
                return Promise.resolve('OK');
            }),
            watch: jest.fn(() => {
                return Promise.resolve('OK');
            }),
        };

        const expected = {
            errors: [],
            previousState: state,
            savedState: transformedState,
        };

        const actual = await casState({
            environment,
            redis,
            stateTransformer,
            validateState,
            worldId,
        });

        expect(actual).toEqual(expected);

        expect(redis.watch.mock.calls).toEqual(
            [
                [
                    'state:env1:world1',
                ],
            ],
        );

        expect(redis.get.mock.calls).toEqual(
            [
                [
                    'state:env1:world1',
                ],
            ],
        );

        expect(redis.unwatch.mock.calls).toEqual(
            [],
        );

        expect(multi.mock.calls).toEqual(
            [
                [],
            ],
        );

        expect(set.mock.calls).toEqual(
            [
                [
                    'state:env1:world1',
                    JSON.stringify(transformedState),
                ],
            ],
        );

        expect(exec.mock.calls).toEqual(
            [
                [],
            ],
        );
    });

    it('returns false when the state has changed since started being watched', async () => {
        const state: CommonState = {
            ...emptyCommonState,
            time: 'time1',
        };

        const transformedState = {
            ...emptyCommonState,
            time: 'time2',
        };

        const validateState = jest.fn(({ toValidate }) => {
            return state;
        });

        const stateTransformer = jest.fn(() => {
            return {
                errors: [],
                state: transformedState,
            };
        });

        const environment = 'env1';
        const worldId = 'world1';

        const exec = jest.fn(() => {
            return Promise.resolve(null);
        });

        const set = jest.fn(() => {
            return {
                ...dummyMultiRedis,
                exec,
            };
        });

        const multi = jest.fn(() => {
            return {
                ...dummyMultiRedis,
                set,
            };
        });

        const redis = {
            ...dummyRedisClient,
            get: jest.fn(() => {
                return Promise.resolve(JSON.stringify(state));
            }),
            multi,
            unwatch: jest.fn(() => {
                return Promise.resolve('OK');
            }),
            watch: jest.fn(() => {
                return Promise.resolve('OK');
            }),
        };

        const expected = {
            errors: [],
            previousState: state,
            savedState: null,
        };

        const actual = await casState({
            environment,
            redis,
            stateTransformer,
            validateState,
            worldId,
        });

        expect(actual).toEqual(expected);

        expect(redis.watch.mock.calls).toEqual(
            [
                [
                    'state:env1:world1',
                ],
            ],
        );

        expect(redis.get.mock.calls).toEqual(
            [
                [
                    'state:env1:world1',
                ],
            ],
        );

        expect(redis.unwatch.mock.calls).toEqual(
            [],
        );

        expect(multi.mock.calls).toEqual(
            [
                [],
            ],
        );

        expect(set.mock.calls).toEqual(
            [
                [
                    'state:env1:world1',
                    JSON.stringify(transformedState),
                ],
            ],
        );

        expect(exec.mock.calls).toEqual(
            [
                [],
            ],
        );
    });

    it('returns errors when state transformation returns errors', async () => {
        const state: CommonState = {
            ...emptyCommonState,
            time: 'time1',
        };

        const validateState = jest.fn(({ toValidate }) => {
            return state;
        });

        const stateTransformer = jest.fn(() => {
            return {
                errors: ['transformationError1', 'transformationError2'],
                state: null,
            };
        });

        const environment = 'env1';
        const worldId = 'world1';

        const exec = jest.fn(() => {
            return Promise.resolve(['OK']);
        });

        const set = jest.fn(() => {
            return {
                ...dummyMultiRedis,
                exec,
            };
        });

        const multi = jest.fn(() => {
            return {
                ...dummyMultiRedis,
                set,
            };
        });

        const redis = {
            ...dummyRedisClient,
            get: jest.fn(() => {
                return Promise.resolve(JSON.stringify(state));
            }),
            multi,
            unwatch: jest.fn(() => {
                return Promise.resolve('OK');
            }),
            watch: jest.fn(() => {
                return Promise.resolve('OK');
            }),
        };

        const expected = {
            errors: ['transformationError1', 'transformationError2'],
            previousState: state,
            savedState: null,
        };

        const actual = await casState({
            environment,
            redis,
            stateTransformer,
            validateState,
            worldId,
        });

        expect(actual).toEqual(expected);

        expect(redis.watch.mock.calls).toEqual(
            [
                [
                    'state:env1:world1',
                ],
            ],
        );

        expect(redis.get.mock.calls).toEqual(
            [
                [
                    'state:env1:world1',
                ],
            ],
        );

        expect(redis.unwatch.mock.calls).toEqual(
            [],
        );

        expect(multi.mock.calls).toEqual(
            [],
        );

        expect(set.mock.calls).toEqual(
            [],
        );

        expect(exec.mock.calls).toEqual(
            [],
        );
    });

    it('fails when the state cannot be watched', async () => {
        const state: CommonState = {
            ...emptyCommonState,
            time: 'time1',
        };

        const transformedState = {
            ...emptyCommonState,
            time: 'time2',
        };

        const validateState = jest.fn(({ toValidate }) => {
            return state;
        });

        const stateTransformer = jest.fn(() => {
            return {
                errors: [],
                state: transformedState,
            };
        });

        const environment = 'env1';
        const worldId = 'world1';

        const exec = jest.fn(() => {
            return Promise.resolve(['OK']);
        });

        const set = jest.fn(() => {
            return {
                ...dummyMultiRedis,
                exec,
            };
        });

        const multi = jest.fn(() => {
            return {
                ...dummyMultiRedis,
                set,
            };
        });

        const redis = {
            ...dummyRedisClient,
            get: jest.fn(() => {
                return Promise.resolve(JSON.stringify(state));
            }),
            multi,
            unwatch: jest.fn(() => {
                return Promise.resolve('OK');
            }),
            watch: jest.fn(() => {
                return Promise.reject(Error('watch error'));
            }),
        };

        const actualPromise = casState({
            environment,
            redis,
            stateTransformer,
            validateState,
            worldId,
        });

        await expect(actualPromise).rejects.toEqual(
            new verror.VError(
                {
                    name: 'CasStateError',
                    cause: Error('watch error'),
                },
                'could not compare and set the state',
            ),
        );

        expect(redis.watch.mock.calls).toEqual(
            [
                [
                    'state:env1:world1',
                ],
            ],
        );

        expect(redis.get.mock.calls).toEqual(
            [],
        );

        expect(redis.unwatch.mock.calls).toEqual(
            [],
        );

        expect(multi.mock.calls).toEqual(
            [],
        );

        expect(set.mock.calls).toEqual(
            [],
        );

        expect(exec.mock.calls).toEqual(
            [],
        );
    });

    it('fails and removes the watch if state retrieval fails', async () => {
        const state: CommonState = {
            ...emptyCommonState,
            time: 'time1',
        };

        const transformedState = {
            ...emptyCommonState,
            time: 'time2',
        };

        const validateState = jest.fn(({ toValidate }) => {
            return state;
        });

        const stateTransformer = jest.fn(() => {
            return {
                errors: [],
                state: transformedState,
            };
        });

        const environment = 'env1';
        const worldId = 'world1';

        const exec = jest.fn(() => {
            return Promise.resolve(['OK']);
        });

        const set = jest.fn(() => {
            return {
                ...dummyMultiRedis,
                exec,
            };
        });

        const multi = jest.fn(() => {
            return {
                ...dummyMultiRedis,
                set,
            };
        });

        const redis = {
            ...dummyRedisClient,
            get: jest.fn(() => {
                return Promise.reject(Error('state read failed'));
            }),
            multi,
            unwatch: jest.fn(() => {
                return Promise.resolve('OK');
            }),
            watch: jest.fn(() => {
                return Promise.resolve('OK');
            }),
        };

        const actualPromise = casState({
            environment,
            redis,
            stateTransformer,
            validateState,
            worldId,
        });

        await expect(actualPromise).rejects.toBeTruthy();

        expect(redis.watch.mock.calls).toEqual(
            [
                [
                    'state:env1:world1',
                ],
            ],
        );

        expect(redis.get.mock.calls).toEqual(
            [
                [
                    'state:env1:world1',
                ],
            ],
        );

        expect(redis.unwatch.mock.calls).toEqual(
            [],
        );

        expect(multi.mock.calls).toEqual(
            [],
        );

        expect(set.mock.calls).toEqual(
            [],
        );

        expect(exec.mock.calls).toEqual(
            [],
        );
    });

    it('fails and removes the watch if state validation fails', async () => {
        const state: CommonState = {
            ...emptyCommonState,
            time: 'time1',
        };

        const transformedState = {
            ...emptyCommonState,
            time: 'time2',
        };

        const validateState = jest.fn(({ toValidate }) => {
            throw Error('state validation error');
        });

        const stateTransformer = jest.fn(() => {
            return {
                errors: [],
                state: transformedState,
            };
        });

        const environment = 'env1';
        const worldId = 'world1';

        const exec = jest.fn(() => {
            return Promise.resolve(['OK']);
        });

        const set = jest.fn(() => {
            return {
                ...dummyMultiRedis,
                exec,
            };
        });

        const multi = jest.fn(() => {
            return {
                ...dummyMultiRedis,
                set,
            };
        });

        const redis = {
            ...dummyRedisClient,
            get: jest.fn(() => {
                return Promise.resolve(JSON.stringify(state));
            }),
            multi,
            unwatch: jest.fn(() => {
                return Promise.resolve('OK');
            }),
            watch: jest.fn(() => {
                return Promise.resolve('OK');
            }),
        };

        const actualPromise = casState({
            environment,
            redis,
            stateTransformer,
            validateState,
            worldId,
        });

        await expect(actualPromise).rejects.toBeTruthy();

        expect(redis.watch.mock.calls).toEqual(
            [
                [
                    'state:env1:world1',
                ],
            ],
        );

        expect(redis.get.mock.calls).toEqual(
            [
                [
                    'state:env1:world1',
                ],
            ],
        );

        expect(redis.unwatch.mock.calls).toEqual(
            [],
        );

        expect(multi.mock.calls).toEqual(
            [],
        );

        expect(set.mock.calls).toEqual(
            [],
        );

        expect(exec.mock.calls).toEqual(
            [],
        );
    });
});
