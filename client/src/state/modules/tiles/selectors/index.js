// @flow

import type { ClientState } from '../../root';
import type { ClientStateTiles } from '../reducer/types';

export const tilesSelector = (state: ClientState): ClientStateTiles => {
    return state.tiles;
};
