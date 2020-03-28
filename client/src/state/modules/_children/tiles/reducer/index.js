// @flow

import type { ClientStateTiles } from './types';
import { updateStateTilesReducer } from './_impl/update-state';
import { UPDATE_STATE } from '../../common-state/actions/types';
import { createClientStateReducer } from '../../../../utils';
import { initialClientState } from '../../../../state';


export const tilesReducer = createClientStateReducer<ClientStateTiles>({
    actionReducers: {
        [UPDATE_STATE]: updateStateTilesReducer,
    },
    initialState: initialClientState.tiles,
});