/**
 * @flow
 */

import type {Dispatch} from 'redux';
import {createStore} from 'redux';
import type {Action, State} from '../types';
import {root} from './reducer';

export const store = createStore<State, Action, Dispatch<Action>>(
    root,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
