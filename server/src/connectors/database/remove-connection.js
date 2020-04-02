// @flow

import type { Redis } from '../../clients/redis';

export const removeConnection = async ({
    connectionId,
    environment,
    redis,
}: {
    connectionId: string,
    environment: string,
    redis: Redis,
}): Promise<void> => {
    await redis.srem(`connection-ids:${environment}`, connectionId);
};
