/**
 * @flow
 */

import type {Reducer} from 'redux';
import {combineReducers} from 'redux';
import type {ClientStateTiles} from './tiles';
import {tilesReducer} from './tiles';
import type {ClientStateCamera} from './camera';
import {cameraReducer} from './camera';
import type {ClientStateMenu} from './menu';
import {menuReducer} from './menu';
import type {ClientStateCities} from './cities';
import {citiesReducer} from './cities';
import type {ClientAction} from '../actions';
import reduceReducers from 'reduce-reducers';
import {globalReducer} from './global';
import type {CommonStateRules, ServerState} from '../../../../common/src/state';
import {serverStateReducer} from './server-state';
import type {ClientStatePlayer} from './player';
import {playerReducer} from './player';

export type ClientState = ?{
    camera: ClientStateCamera,
    cities: ClientStateCities,
    menu: ClientStateMenu,
    player: ClientStatePlayer,
    rules: CommonStateRules,
    serverState: ?ServerState,
    tiles: ClientStateTiles,
};

export const rootReducer: Reducer<ClientState, ClientAction> = reduceReducers(
    combineReducers({
        camera: cameraReducer,
        cities: citiesReducer,
        menu: menuReducer,
        player: playerReducer,
        serverState: serverStateReducer,
        tiles: tilesReducer,
    }),
    globalReducer
);
