// @flow

import type {
    DatabaseConnectionByPlayerKey,
} from './types';
import type {
    KeyCreator,
} from '../../types';

export const createKey: KeyCreator< DatabaseConnectionByPlayerKey > = (
    {
        key,
    },
) => {

    return `connection-by-player:${ key.environment }:${ key.playerId }`;

};
