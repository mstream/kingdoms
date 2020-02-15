/**
 * @flow
 */

import type {Dispatch} from 'redux';
import {applyMiddleware, compose, createStore} from 'redux';
import type {ClientState} from './reducers/root';
import {rootReducer} from './reducers/root';
import {websocketMiddleware} from './middleware/websocket';
import type {ClientAction} from '../actions';

export const store = createStore<ClientState, ClientAction, Dispatch<ClientAction>>(
    rootReducer,
    compose(
        applyMiddleware(
            websocketMiddleware({url: 'wss://m6jxq9whdl.execute-api.eu-west-1.amazonaws.com/Prod'})
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
);

