// @flow

import { dummyRedisClient } from '../../clients/redis';
import { addConnection } from './add-connection';

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

        expect(redis.sadd.mock.calls).toEqual([
            ['connection-ids:env1', 'connection1'],
        ]);
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

        expect(redis.sadd.mock.calls).toEqual([
            ['connection-ids:env1', 'connection1'],
        ]);
    });
});
