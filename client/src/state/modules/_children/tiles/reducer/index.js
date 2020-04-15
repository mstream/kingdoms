// @flow

import {
    UPDATE_STATE,
} from '../../common-state/actions/types';
import {
    createClientStateReducer,
} from '../../../../utils';
import {
    initialClientState,
} from '../../../../state';
import {
    updateStateTilesReducer,
} from './_impl/update-state';
import type {
    ClientStateTiles,
} from './types';

export const tilesReducer = createClientStateReducer<ClientStateTiles>(
    {
        actionReducers: {
            [ UPDATE_STATE ]: updateStateTilesReducer,
        },
        initialState: initialClientState.tiles,
    },
);
