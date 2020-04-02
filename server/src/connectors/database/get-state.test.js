// @flow

import { dummyRedisClient } from '../../clients/redis';
import type { CommonState } from '../../../../common/src/state/modules/types';
import { emptyCommonState } from '../../../../common/src/state/modules/state';
import verror from 'verror';
import { getState } from './get-state';

describe('getState', () => {
    it('retrieves and validates state', async () => {
        const state: CommonState = {
            ...emptyCommonState,
        };

        const environment = 'env1';
        const worldId = 'world1';

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
            worldId,
        });

        expect(actual).toEqual(expected);

        expect(redis.get.mock.calls).toEqual([['state:env1:world1']]);

        expect(validateState.mock.calls).toEqual([
            [
                {
                    toValidate: state,
                },
            ],
        ]);
    });

    it('fails when cannot retrieve the state', async () => {
        const state: CommonState = {
            ...emptyCommonState,
        };

        const environment = 'env1';
        const worldId = 'world1';

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
            worldId,
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

        expect(redis.get.mock.calls).toEqual([['state:env1:world1']]);

        expect(validateState.mock.calls).toEqual([]);
    });

    it('fails when retrieved state does not pass a validation', async () => {
        const state: CommonState = {
            ...emptyCommonState,
        };

        const environment = 'env1';
        const worldId = 'world1';

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
            worldId,
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

        expect(redis.get.mock.calls).toEqual([['state:env1:world1']]);

        expect(validateState.mock.calls).toEqual([
            [
                {
                    toValidate: state,
                },
            ],
        ]);
    });
});
