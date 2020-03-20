// @flow

import { parseJson, serializeState } from '../../../common/src/util';
import type { Redis } from '../clients/redis';
import verror from 'verror';
import type { CommonState } from '../../../common/src/state/modules/types';
import type { CommonStateValidator } from '../../../common/src/state/modules/utils';

const createStateKey = ({ environment }: { environment: string }): string => {
    return `state:${environment}`;
};

export const getConnections = async (
    {
        environment,
        redis,
    }: {
        environment: string,
        redis: Redis,
    },
): Promise<$ReadOnlyArray<string>> => {
    return await redis.smembers(`connection-ids:${environment}`);
};

export const addConnection = async (
    {
        connectionId,
        environment,
        redis,
    }: {
        connectionId: string,
        environment: string,
        redis: Redis,
    },
): Promise<void> => {
    await redis.sadd(`connection-ids:${environment}`, connectionId);
};

export const removeConnection = async (
    {
        connectionId,
        environment,
        redis,
    }: {
        connectionId: string,
        environment: string,
        redis: Redis,
    },
): Promise<void> => {
    await redis.srem(`connection-ids:${environment}`, connectionId);
};

export const getState = async (
    {
        environment,
        redis,
        validateState,
    }: {
        environment: string,
        redis: Redis,
        validateState: CommonStateValidator,
    },
): Promise<CommonState> => {
    try {
        const serializedState = await redis.get(createStateKey({ environment }));
        const state = parseJson({ json: serializedState });
        return validateState({ toValidate: state });
    } catch (error) {
        throw new verror.VError(
            {
                name: 'GetStateError',
                cause: error,
            },
            'could not retrieve the current state',
        );
    }
};

export const setState = async (
    {
        environment,
        redis,
        state,
    }: {
        environment: string,
        redis: Redis,
        state: CommonState,
    }): Promise<void> => {
    try {
        await redis.set(createStateKey({ environment }), serializeState({ state }));
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

export const casState = async (
    {
        environment,
        redis,
        stateTransformer,
        validateState,
    }: {
        environment: string,
        redis: Redis,
        stateTransformer: ({ state: CommonState }) => $ReadOnly<{ errors: $ReadOnlyArray<string>, state: ?CommonState }>,
        validateState: CommonStateValidator,
    }): Promise<$ReadOnly<{ errors: $ReadOnlyArray<string>, previousState: CommonState, savedState: ?CommonState }>> => {
    try {
        const stateKey = createStateKey({ environment });
        await redis.watch(stateKey);

        const previousState = await getState({
            environment,
            redis,
            validateState: validateState,
        });

        const stateTransformationResult = stateTransformer({ state: previousState });

        if (stateTransformationResult.state == null || stateTransformationResult.errors.length > 0) {
            return {
                errors: stateTransformationResult.errors,
                previousState,
                savedState: null,
            };
        }

        const serializedState = serializeState({ state: stateTransformationResult.state });

        const result = await redis
            .multi()
            .set(stateKey, serializedState)
            .exec();

        const savedState = result == null ? null : stateTransformationResult.state;

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
