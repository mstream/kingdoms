// @flow

import type { Reducer } from 'redux';
import combineReducers from 'combine-reducers-global-state';
import { tilesReducer } from './tiles/reducer';
import { cameraReducer } from './camera/reducer';
import { menuReducer } from './menu/reducer';
import type { ClientAction } from '../actions';
import { commonStateReducer } from './common-state/reducer';
import { playerReducer } from './player/reducer';
import type { ClientState } from './types';


export const rootReducer: Reducer<ClientState, ClientAction> = combineReducers({
    camera: cameraReducer,
    menu: menuReducer,
    player: playerReducer,
    commonState: commonStateReducer,
    tiles: tilesReducer,
});

