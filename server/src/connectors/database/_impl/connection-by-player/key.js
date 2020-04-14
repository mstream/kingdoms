// @flow

import type {
    KeyCreator,
} from '../../types';
import type {
    DatabaseConnectionByPlayerKey,
} from './types';

export const createKey: KeyCreator< DatabaseConnectionByPlayerKey > = (
    {
        key,
    },
) => {

    return `connection-by-player:${ key.environment }:${ key.playerId }`;

};
