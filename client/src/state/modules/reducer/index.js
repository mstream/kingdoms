// @flow

import type { Reducer } from 'redux';
import combineReducers from 'combine-reducers-global-state';
import { tilesReducer } from '../_children/tiles/reducer';
import { cameraReducer } from '../_children/camera/reducer';
import { menuReducer } from '../_children/menu/reducer';
import { commonStateReducer } from '../_children/common-state/reducer';
import { playerReducer } from '../_children/player/reducer';
import { errorsReducer } from '../_children/errors/reducer';
import type { ClientAction, ClientState } from '../../types';

export const rootReducer: Reducer<ClientState, ClientAction> = combineReducers({
    camera: cameraReducer,
    errors: errorsReducer,
    menu: menuReducer,
    player: playerReducer,
    commonState: commonStateReducer,
    tiles: tilesReducer,
});
