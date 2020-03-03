// @flow

import type {Dispatch} from 'redux';
import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from './reducers/root';
import {websocketMiddleware} from './middleware/websocket';
import type {ClientAction} from './actions';
import queryString from 'query-string';
import type {ClientState} from './state';
import {composeWithDevTools} from 'redux-devtools-extension';

const clientId = `5ujsbhm0e966tcue4cca3dkmut`;
const cognitoBaseUrl = `https://kingdoms.auth.eu-west-1.amazoncognito.com`;
const signInUrl = `${cognitoBaseUrl}/login?client_id=${clientId}&response_type=token&scope=email+openid&redirect_uri=${window.location.origin}`;
const signOutUrl = `${cognitoBaseUrl}/logout?client_id=${clientId}&response_type=token&scope=email+openid&redirect_uri=${window.location.origin}`;
const wsUrl = `wss://fyl4du2353.execute-api.eu-west-1.amazonaws.com/Prod`;

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

export const store = createStore<ClientState,
    ClientAction,
    Dispatch<ClientAction>>(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            websocketMiddleware({
                token: getIdToken(),
                url: wsUrl,
            })
        ),
    )
);


