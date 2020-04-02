// @flow

import type { Redis } from '../../clients/redis';

export const addConnection = async ({
    connectionId,
    environment,
    redis,
}: {
    connectionId: string,
    environment: string,
    redis: Redis,
}): Promise<void> => {
    await redis.sadd(`connection-ids:${environment}`, connectionId);
};
