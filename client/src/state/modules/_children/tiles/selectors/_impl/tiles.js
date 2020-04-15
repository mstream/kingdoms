// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    ClientStateTiles,
} from '../../reducer/types';

export const tilesSelector: ClientStateSelector< ClientStateTiles > = (
    state,
) => {

    return state.tiles;

};
