/**
 * @flow
 */

import type {Dispatch} from 'redux';
import {applyMiddleware, compose, createStore} from 'redux';
import type {Action} from '../types';
import {rootReducer} from './reducers/root';
import {websocketMiddleware} from './middleware/websocket';
import type {ClientState} from './types';

export const store = createStore<ClientState, Action, Dispatch<Action>>(
    rootReducer,
    compose(
        applyMiddleware(
            websocketMiddleware({url: 'wss://m6jxq9whdl.execute-api.eu-west-1.amazonaws.com/Prod'})
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
);
