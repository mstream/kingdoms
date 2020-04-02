// @flow

import { parseJson } from '../../../../common/src/util';
import type { Redis } from '../../clients/redis';
import verror from 'verror';
import type { CommonState } from '../../../../common/src/state/modules/types';
import type { TypeValidator } from '../../../../common/src/validators/types';
import { createStateKey } from './utils';


export const getState = async (
    {
        environment,
        redis,
        validateState,
        worldId,
    }: {
        environment: string,
        redis: Redis,
        validateState: TypeValidator<CommonState>,
        worldId: string,
    },
): Promise<CommonState> => {
    try {
        const serializedState = await redis.get(
            createStateKey({
                environment,
                worldId,
            })
        );
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
