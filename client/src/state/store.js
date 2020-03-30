// @flow

import type { Dispatch } from 'redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './modules/reducer';
import { websocketMiddleware } from './middleware/websocket';
import { composeWithDevTools } from 'redux-devtools-extension';
import { config } from '../config';
import type { ClientAction, ClientState, ClientStore } from './types';


const composeEnhancers = composeWithDevTools({
    trace: true,
});

export const createClientStore = ({ token }: { token: string }): ClientStore => {
    return createStore<ClientState,
        ClientAction,
        Dispatch<ClientAction>>(
        rootReducer,
        composeEnhancers(
            applyMiddleware(
                websocketMiddleware({
                    token,
                    url: config.wsUrl,
                }),
            ),
        ),
    );
};


