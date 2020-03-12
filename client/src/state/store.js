// @flow

import type { Dispatch } from 'redux';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './reducers/root';
import { websocketMiddleware } from './middleware/websocket';
import type { ClientAction } from './actions';
import queryString from 'query-string';
import type { ClientState } from './state';
import { composeWithDevTools } from 'redux-devtools-extension';

const clientId = CLIENT_ID;
const cognitoBaseUrl = COGNITO_URL;
const signInUrl = `${cognitoBaseUrl}/login?client_id=${clientId}&response_type=token&scope=email+openid&redirect_uri=${window.location.origin}`;
const signOutUrl = `${cognitoBaseUrl}/logout?client_id=${clientId}&response_type=token&scope=email+openid&redirect_uri=${window.location.origin}`;
const wsUrl = WEB_SOCKET_URI;

const getIdToken = (): string => {
    const locationHash = queryString.parse(window.location.hash);
    const idToken = locationHash['id_token'];
    if (typeof idToken !== 'string') {
        console.log('no id token: redirecting to the authentication website');
        window.location.replace(signInUrl);
        return '';
    } else {
        return idToken;
    }
};

export const signOut = (): void => {
    window.location.replace(signOutUrl);
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
                    url: wsUrl,
                }),
            ),
        ),
    );
};


