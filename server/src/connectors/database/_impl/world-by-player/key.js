// @flow

import type {
    DatabaseWorldByPlayerKey,
} from './types';
import type {
    KeyCreator,
} from '../../types';

export const createKey: KeyCreator< DatabaseWorldByPlayerKey > = (
    {
        key,
    },
) => {

    return `world-by-player:${ key.environment }:${ key.playerId }`;

};
