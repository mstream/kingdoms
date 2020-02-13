/**
 * @flow
 */

import type {Reducer} from 'redux';
import {combineReducers} from 'redux';
import {worldMapReducer} from './world-map';
import type {Action, State} from '../../types';


const uiReducer = combineReducers({worldMap: worldMapReducer});

export const rootReducer: Reducer<State, Action> = combineReducers({ui: uiReducer});
