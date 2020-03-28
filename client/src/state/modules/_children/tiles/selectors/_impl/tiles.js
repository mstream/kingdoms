// @flow


import type { ClientStateTiles } from '../../reducer/types';
import type { ClientStateSelector } from '../../../../../types';

export const tilesSelector: ClientStateSelector<ClientStateTiles> =
    (state) => {
        return state.tiles;
    };