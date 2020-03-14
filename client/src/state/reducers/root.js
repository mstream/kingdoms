// @flow

import type { Reducer } from 'redux';
import combineReducers from 'combine-reducers-global-state';
import { tilesReducer } from './tiles';
import { cameraReducer } from './camera';
import { menuReducer } from './menu';
import type { ClientAction } from '../actions';
import { commonStateReducer } from './common-state';
import { playerReducer } from './player';
import type { ClientState } from '../state';

export type ClientStateReducerTestScenario<S, A: ClientAction> = {
    name: string,
    action: A,
    previousGlobalState: ClientState,
    expectedLocalStateCreator: ({ previousLocalState: S }) => S,
};

export const rootReducer: Reducer<ClientState, ClientAction> = combineReducers({
    camera: cameraReducer,
    menu: menuReducer,
    player: playerReducer,
    commonState: commonStateReducer,
    tiles: tilesReducer,
});
