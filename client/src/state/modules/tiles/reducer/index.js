// @flow

import type { ClientStateTiles } from './types';
import type { ClientAction } from '../../../actions';
import { UPDATE_STATE } from '../../../actions';
import { updateStateTilesReducer } from './update-state';
import { unsupportedActionReducer } from '../../unsupported-action-reducer';
import type { ClientState } from '../../root';

export const initialTilesState = {
    city: {},
    terrain: [],
};

export const tilesReducer = (
    localState: ClientStateTiles = initialTilesState,
    action: ClientAction,
    globalState: ClientState,
): ClientStateTiles => {
    switch (action.type) {
        case UPDATE_STATE: {
            return updateStateTilesReducer({
                action,
                globalState,
                localState,
            });
        }
        default: {
            return unsupportedActionReducer({
                action,
                globalState,
                localState,
            });
        }
    }
};
