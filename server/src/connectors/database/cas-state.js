// @flow

import { serializeState } from '../../../../common/src/util';
import type { Redis } from '../../clients/redis';
import verror from 'verror';
import type { CommonState } from '../../../../common/src/state/modules/types';
import type { TypeValidator } from '../../../../common/src/validators/types';
import { createStateKey } from './utils';
import { getState } from './get-state';

export const casState = async ({
    environment,
    redis,
    stateTransformer,
    validateState,
    worldId,
}: {
    environment: string,
    redis: Redis,
    stateTransformer: ({ state: CommonState }) => $ReadOnly<{
        errors: $ReadOnlyArray<string>,
        state: ?CommonState,
    }>,
    validateState: TypeValidator<CommonState>,
    worldId: string,
}): Promise<
    $ReadOnly<{
        errors: $ReadOnlyArray<string>,
        previousState: CommonState,
        savedState: ?CommonState,
    }>,
> => {
    try {
        const stateKey = createStateKey({ environment, worldId });
        await redis.watch(stateKey);

        const previousState = await getState({
            environment,
            redis,
            validateState: validateState,
            worldId,
        });

        const stateTransformationResult = stateTransformer({
            state: previousState,
        });

        if (
            stateTransformationResult.state == null ||
            stateTransformationResult.errors.length > 0
        ) {
            return {
                errors: stateTransformationResult.errors,
                previousState,
                savedState: null,
            };
        }

        const serializedState = serializeState({
            state: stateTransformationResult.state,
        });

        const result = await redis
            .multi()
            .set(stateKey, serializedState)
            .exec();

        const savedState =
            result == null ? null : stateTransformationResult.state;

        return {
            errors: [],
            previousState,
            savedState,
        };
    } catch (error) {
        throw new verror.VError(
            {
                name: 'CasStateError',
                cause: error,
            },
            'could not compare and set the state',
        );
    }
};
