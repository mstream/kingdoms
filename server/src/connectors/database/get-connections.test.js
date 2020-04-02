// @flow

import { dummyRedisClient } from '../../clients/redis';
import { getConnections } from './get-connections';

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

        expect(redis.smembers.mock.calls).toEqual([['connection-ids:env1']]);
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

        expect(redis.smembers.mock.calls).toEqual([['connection-ids:env1']]);
    });
});
