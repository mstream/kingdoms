// @flow

import type { Redis } from '../../clients/redis';

export const getConnections = async ({
    environment,
    redis,
}: {
    environment: string,
    redis: Redis,
}): Promise<$ReadOnlyArray<string>> => {
    return await redis.smembers(`connection-ids:${environment}`);
};
