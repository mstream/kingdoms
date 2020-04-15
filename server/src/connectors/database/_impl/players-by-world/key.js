// @flow

import type {
    DatabasePlayersByWorldKey,
} from './types';
import type {
    KeyCreator,
} from '../../types';

export const createKey: KeyCreator< DatabasePlayersByWorldKey > = (
    {
        key,
    },
) => {

    return `players-by-world:${ key.environment }:${ key.worldId }`;

};
