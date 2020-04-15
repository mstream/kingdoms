// @flow

import type {
    DatabaseStatesByWorldKey,
} from './types';
import type {
    KeyCreator,
} from '../../types';

export const createKey: KeyCreator< DatabaseStatesByWorldKey > = (
    {
        key,
    },
) => {

    return `state-by-world:${ key.environment }:${ key.worldId }`;

};
