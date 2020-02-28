/**
 * @flow
 */

import type {Dispatch} from 'redux';
import {applyMiddleware, compose, createStore} from 'redux';
import type {ClientState} from './reducers/root';
import {rootReducer} from './reducers/root';
import {websocketMiddleware} from './middleware/websocket';
import type {ClientAction} from './actions';

const websocketUrl = 'wss://fyl4du2353.execute-api.eu-west-1.amazonaws.com/Prod?token=validToken';

export const store = createStore<ClientState,
    ClientAction,
    Dispatch<ClientAction>>(
    rootReducer,
    compose(
        applyMiddleware(
            websocketMiddleware({
                url: websocketUrl,
            })
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
