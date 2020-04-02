// @flow

import { dummyRedisClient } from '../../clients/redis';
import { removeConnection } from './remove-connection';

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

        expect(redis.srem.mock.calls).toEqual([
            ['connection-ids:env1', 'connection1'],
        ]);
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

        expect(redis.srem.mock.calls).toEqual([
            ['connection-ids:env1', 'connection1'],
        ]);
    });
});
