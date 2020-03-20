// @flow

import {
    addConnection,
    casState,
    getConnections,
    getState,
    removeConnection,
    setState,
} from './database';
import { emptyCommonState } from '../../../common/src/state/modules/state';
import verror from 'verror';
import type { CommonState } from '../../../common/src/state/modules/types';
import { dummyMultiRedis, dummyRedisClient } from '../clients/redis';

describe('getConnections', () => {
    it('gets connections', async () => {
        const environment = 'env1';

        const redis = {
            ...dummyRedisClient,
            smembers: jest.fn(() => {
                return Promise.resolve(['connection1', 'connection2']);
            }),
        };

        const expected = ['connection1', 'connection2'];

        const actual = await getConnections({
            environment,
            redis,
        });

        expect(actual).toEqual(expected);

        expect(redis.smembers.mock.calls).toEqual(
            [
                [
                    'connection-ids:env1',
                ],
            ],
        );
    });

    it('fails on redis members failure', async () => {
        const environment = 'env1';

        const redis = {
            ...dummyRedisClient,
            smembers: jest.fn(() => {
                return Promise.reject(Error('smembers error'));
            }),
        };

        const actualPromise = getConnections({
            environment,
            redis,
        });

        await expect(actualPromise).rejects.toBeTruthy();

        expect(redis.smembers.mock.calls).toEqual(
            [
                [
                    'connection-ids:env1',
                ],
            ],
        );
    });
});

describe('addConnection', () => {
    it('adds connection', async () => {
        const connectionId = 'connection1';
        const environment = 'env1';

        const redis = {
            ...dummyRedisClient,
            sadd: jest.fn(() => {
                return Promise.resolve(1);
            }),
        };

        await addConnection({
            connectionId,
            environment,
            redis,
        });

        expect(redis.sadd.mock.calls).toEqual(
            [
                [
                    'connection-ids:env1',
                    'connection1',
                ],
            ],
        );
    });

    it('fails on redis add failure', async () => {
        const connectionId = 'connection1';
        const environment = 'env1';

        const redis = {
            ...dummyRedisClient,
            sadd: jest.fn(() => {
                return Promise.reject(Error('sadd error'));
            }),
        };

        const actualPromise = addConnection({
            connectionId,
            environment,
            redis,
        });

        await expect(actualPromise).rejects.toBeTruthy();

        expect(redis.sadd.mock.calls).toEqual(
            [
                [
                    'connection-ids:env1',
                    'connection1',
                ],
            ],
        );
    });
});

describe('removeConnection', () => {
    it('removes connection', async () => {
        const connectionId = 'connection1';
        const environment = 'env1';

        const redis = {
            ...dummyRedisClient,
            srem: jest.fn(() => {
                return Promise.resolve(1);
            }),
        };

        await removeConnection({
            connectionId,
            environment,
            redis,
        });

        expect(redis.srem.mock.calls).toEqual(
            [
                [
                    'connection-ids:env1',
                    'connection1',
                ],
            ],
        );
    });

    it('fails on redis remove failure', async () => {
        const connectionId = 'connection1';
        const environment = 'env1';

        const redis = {
            ...dummyRedisClient,
            srem: jest.fn(() => {
                return Promise.reject(Error('srem error'));
            }),
        };

        const actualPromise = removeConnection({
            connectionId,
            environment,
            redis,
        });

        await expect(actualPromise).rejects.toBeTruthy();

        expect(redis.srem.mock.calls).toEqual(
            [
                [
                    'connection-ids:env1',
                    'connection1',
                ],
            ],
        );
    });
});

describe('getState', () => {
    it('retrieves and validates state', async () => {
        const state: CommonState = {
            ...emptyCommonState,
        };

        const environment = 'env1';

        const redis = {
            ...dummyRedisClient,
            get: jest.fn(() => {
                return Promise.resolve(JSON.stringify(state));
            }),
        };

        const validateState = jest.fn(({ toValidate }) => {
            return state;
        });

        const expected = state;

        const actual = await getState({
            environment,
            redis,
            validateState,
        });

        expect(actual).toEqual(expected);

        expect(redis.get.mock.calls).toEqual(
            [
                [
                    'state:env1',
                ],
            ],
        );

        expect(validateState.mock.calls).toEqual(
            [
                [
                    {
                        toValidate: state,
                    },
                ],
            ],
        );
    });

    it('fails when cannot retrieve the state', async () => {
        const state: CommonState = {
            ...emptyCommonState,
        };

        const environment = 'env1';

        const redis = {
            ...dummyRedisClient,
            get: jest.fn(() => {
                return Promise.reject(Error('database error'));
            }),
        };

        const validateState = jest.fn(({ toValidate }) => {
            return state;
        });

        const actualPromise = getState({
            environment,
            redis,
            validateState,
        });

        await expect(actualPromise).rejects.toEqual(
            new verror.VError(
                {
                    name: 'GetStateError',
                    cause: Error('database error'),
                },
                'could not retrieve the current state',
            ),
        );

        expect(redis.get.mock.calls).toEqual(
            [
                [
                    'state:env1',
                ],
            ],
        );

        expect(validateState.mock.calls).toEqual(
            [],
        );
    });

    it('fails when retrieved state does not pass a validation', async () => {
        const state: CommonState = {
            ...emptyCommonState,
        };

        const environment = 'env1';

        const redis = {
            ...dummyRedisClient,
            get: jest.fn(() => {
                return Promise.resolve(JSON.stringify(state));
            }),
        };

        const validateState = jest.fn(({ toValidate }) => {
            throw Error('invalid state');
        });

        const actualPromise = getState({
            environment,
            redis,
            validateState,
        });

        await expect(actualPromise).rejects.toEqual(
            new verror.VError(
                {
                    name: 'GetStateError',
                    cause: Error('invalid state'),
                },
                'could not retrieve the current state',
            ),
        );

        expect(redis.get.mock.calls).toEqual(
            [
                [
                    'state:env1',
                ],
            ],
        );

        expect(validateState.mock.calls).toEqual(
            [
                [
                    {
                        toValidate: state,
                    },
                ],
            ],
        );
    });
});


describe('setState', () => {
    it('sets the state', async () => {
        const state: CommonState = {
            ...emptyCommonState,
        };

        const environment = 'env1';

        const redis = {
            ...dummyRedisClient,
            set: jest.fn(() => {
                return Promise.resolve('OK');
            }),
        };

        await setState({
            environment,
            redis,
            state,
        });

        expect(redis.set.mock.calls).toEqual(
            [
                [
                    'state:env1',
                    JSON.stringify(state),
                ],
            ],
        );
    });

    it('fails when cannot set the state', async () => {
        const state: CommonState = {
            ...emptyCommonState,
        };

        const environment = 'env1';

        const redis = {
            ...dummyRedisClient,
            set: jest.fn(() => {
                return Promise.reject(Error('database error'));
            }),
        };

        const actualPromise = setState({
            environment,
            redis,
            state,
        });

        await expect(actualPromise).rejects.toEqual(
            new verror.VError(
                {
                    name: 'GetStateError',
                    cause: Error('database error'),
                },
                'could not save the state',
            ),
        );

        expect(redis.set.mock.calls).toEqual(
            [
                [
                    'state:env1',
                    JSON.stringify(state),
                ],
            ],
        );
    });
});


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
        });

        expect(actual).toEqual(expected);

        expect(redis.watch.mock.calls).toEqual(
            [
                [
                    'state:env1',
                ],
            ],
        );

        expect(redis.get.mock.calls).toEqual(
            [
                [
                    'state:env1',
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
                    'state:env1',
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
        });

        expect(actual).toEqual(expected);

        expect(redis.watch.mock.calls).toEqual(
            [
                [
                    'state:env1',
                ],
            ],
        );

        expect(redis.get.mock.calls).toEqual(
            [
                [
                    'state:env1',
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
                    'state:env1',
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
        });

        expect(actual).toEqual(expected);

        expect(redis.watch.mock.calls).toEqual(
            [
                [
                    'state:env1',
                ],
            ],
        );

        expect(redis.get.mock.calls).toEqual(
            [
                [
                    'state:env1',
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
                    'state:env1',
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
        });

        await expect(actualPromise).rejects.toBeTruthy();

        expect(redis.watch.mock.calls).toEqual(
            [
                [
                    'state:env1',
                ],
            ],
        );

        expect(redis.get.mock.calls).toEqual(
            [
                [
                    'state:env1',
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
        });

        await expect(actualPromise).rejects.toBeTruthy();

        expect(redis.watch.mock.calls).toEqual(
            [
                [
                    'state:env1',
                ],
            ],
        );

        expect(redis.get.mock.calls).toEqual(
            [
                [
                    'state:env1',
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
