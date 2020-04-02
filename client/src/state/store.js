// @flow

import type { Dispatch } from 'redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './modules/reducer';
import { websocketMiddleware } from './middleware/websocket';
import { composeWithDevTools } from 'redux-devtools-extension';
import { config } from '../config';
import type { ClientAction, ClientState, ClientStore } from './types';
import type { IdTokenInfo } from '../types';

const composeEnhancers = composeWithDevTools({
    trace: true,
});

export const createClientStore = ({
    location,
    tokenInfo,
}: {
    location: Location,
    tokenInfo: IdTokenInfo,
}): ClientStore => {
    return createStore<ClientState, ClientAction, Dispatch<ClientAction>>(
        rootReducer,
        composeEnhancers(
            applyMiddleware(
                websocketMiddleware({
                    location,
                    tokenInfo,
                    url: config.wsUrl,
                }),
            ),
        ),
    );
};
