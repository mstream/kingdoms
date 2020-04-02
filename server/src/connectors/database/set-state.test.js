// @flow

import { dummyRedisClient } from '../../clients/redis';
import type { CommonState } from '../../../../common/src/state/modules/types';
import { emptyCommonState } from '../../../../common/src/state/modules/state';
import verror from 'verror';
import { setState } from './set-state';

describe('setState', () => {
    it('sets the state', async () => {
        const state: CommonState = {
            ...emptyCommonState,
        };

        const environment = 'env1';
        const worldId = 'world1';

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
            worldId,
        });

        expect(redis.set.mock.calls).toEqual(
            [
                [
                    'state:env1:world1',
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
        const worldId = 'world1';

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
            worldId,
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
                    'state:env1:world1',
                    JSON.stringify(state),
                ],
            ],
        );
    });
});

