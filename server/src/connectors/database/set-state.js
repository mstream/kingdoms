// @flow

import { serializeState } from '../../../../common/src/util';
import type { Redis } from '../../clients/redis';
import verror from 'verror';
import type { CommonState } from '../../../../common/src/state/modules/types';
import { createStateKey } from './utils';


export const setState = async (
    {
        environment,
        redis,
        state,
        worldId,
    }: {
        environment: string,
        redis: Redis,
        state: CommonState,
        worldId: string,
    }): Promise<void> => {
    try {
        await redis.set(createStateKey({
            environment,
            worldId,
        }), serializeState({ state }));
    } catch (error) {
        throw new verror.VError(
            {
                name: 'SetStateError',
                cause: error,
            },
            'could not save the state',
        );
    }
};
