// @flow

import type { Reducer } from 'redux';
import combineReducers from 'combine-reducers-global-state';
import { initialTilesState, tilesReducer } from './tiles';
import { cameraReducer, initialCameraState } from './camera';
import { initialMenuState, menuReducer } from './menu';
import type { ClientAction } from '../actions';
import { commonStateReducer, initialCommonStateState } from './common-state';
import { initialPlayerState, playerReducer } from './player';


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