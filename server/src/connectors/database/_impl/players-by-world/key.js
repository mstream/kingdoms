// @flow

import type {
    KeyCreator,
} from '../../types';
import type {
    DatabasePlayersByWorldKey,
} from './types';

export const createKey: KeyCreator< DatabasePlayersByWorldKey > = (
    {
        key,
    },
) => {

    return `players-by-world:${ key.environment }:${ key.worldId }`;

};
