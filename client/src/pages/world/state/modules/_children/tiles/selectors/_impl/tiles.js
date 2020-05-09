// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    ClientStateTiles,
} from '../../reducer/types';

export const tilesSelector: ClientStateSelector< ClientStateTiles, void > = (
    state,
) => {

    return state.tiles;

};
