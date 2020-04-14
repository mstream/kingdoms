// @flow

import type {
    KeyCreator,
} from '../../types';
import type {
    DatabaseStatesByWorldKey,
} from './types';

export const createKey: KeyCreator< DatabaseStatesByWorldKey > = (
    {
        key,
    },
) => {

    return `state-by-world:${ key.environment }:${ key.worldId }`;

};
