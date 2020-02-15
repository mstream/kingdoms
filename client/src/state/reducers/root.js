/**
 * @flow
 */

import type {Reducer} from 'redux';
import {combineReducers} from 'redux';
import type {Action} from '../../types';
import type {ClientState} from '../types';
import {tilesReducer} from './tiles';
import {cameraReducer} from './camera';
import {citiesReducer} from './cities';
import {menuReducer} from './menus';

export const tileSize = {
    x: 64,
    y: 64
};

export const rootReducer: Reducer<ClientState, Action> = combineReducers({
    camera: cameraReducer,
    citiesById: citiesReducer,
    menu: menuReducer,
    tiles: tilesReducer
});
