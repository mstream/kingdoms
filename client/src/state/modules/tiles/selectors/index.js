// @flow

import type { ClientStateTiles } from '../reducer/types';
import type { ClientState } from '../../types';

export const tilesSelector = (state: ClientState): ClientStateTiles => {
    return state.tiles;
};
