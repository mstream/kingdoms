// @flow

import type { Reducer } from 'redux';
import combineReducers from 'combine-reducers-global-state';
import { initialTilesState, tilesReducer } from './tiles/reducer';
import { cameraReducer, initialCameraState } from './camera/reducer';
import { initialMenuState, menuReducer } from './menu/reducer';
import type { ClientAction } from '../actions';
import { commonStateReducer, initialCommonStateState } from './common-state/reducer';
import { initialPlayerState, playerReducer } from './player/reducer';


export const rootReducer: Reducer<ClientState, ClientAction> = combineReducers({
    camera: cameraReducer,
    menu: menuReducer,
    player: playerReducer,
    commonState: commonStateReducer,
    tiles: tilesReducer,
});

export const initialClientState = {
    camera: initialCameraState,
    menu: initialMenuState,
    player: initialPlayerState,
    commonState: initialCommonStateState,
    tiles: initialTilesState,
};

export type ClientState = typeof initialClientState;