// @flow

import type { Dispatch } from 'redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './modules/root';
import { websocketMiddleware } from './middleware/websocket';
import queryString from 'query-string';
import { composeWithDevTools } from 'redux-devtools-extension';
import { config } from '../config';
import type { ClientState } from './modules/types';
import type { ClientAction } from './types';

const getIdToken = (): string => {
    const locationHash = queryString.parse(window.location.hash);
    const idToken = locationHash['id_token'];
    if (typeof idToken !== 'string') {
        console.log('no id token: redirecting to the authentication website');
        window.location.replace(config.cognitoSignInUrl);
        return '';
    } else {
        return idToken;
    }
};

export const signOut = (): void => {
    window.location.replace(config.cognitoSignOutUrl);
};

const composeEnhancers = composeWithDevTools({
    trace: true,
});

export const createClientStore = () => {
    return createStore<ClientState,
        ClientAction,
        Dispatch<ClientAction>>(
        rootReducer,
        composeEnhancers(
            applyMiddleware(
                websocketMiddleware({
                    token: getIdToken(),
                    url: config.wsUrl,
                }),
            ),
        ),
    );
};


