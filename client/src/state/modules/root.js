// @flow

import type { Reducer } from 'redux';
import combineReducers from 'combine-reducers-global-state';
import { tilesReducer } from './tiles/reducer';
import { cameraReducer } from './camera/reducer';
import { menuReducer } from './menu/reducer';
import { commonStateReducer } from './common-state/reducer';
import { playerReducer } from './player/reducer';
import type { ClientState } from './types';
import { errorsReducer } from './errors/reducer';
import type { ClientAction } from '../types';


export const rootReducer: Reducer<ClientState, ClientAction> = combineReducers({
    camera: cameraReducer,
    errors: errorsReducer,
    menu: menuReducer,
    player: playerReducer,
    commonState: commonStateReducer,
    tiles: tilesReducer,
});

