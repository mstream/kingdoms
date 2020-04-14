// @flow

import type {
    KeyCreator,
} from '../../types';
import type {
    DatabaseWorldByPlayerKey,
} from './types';

export const createKey: KeyCreator< DatabaseWorldByPlayerKey > = (
    {
        key,
    },
) => {

    return `world-by-player:${ key.environment }:${ key.playerId }`;

};
