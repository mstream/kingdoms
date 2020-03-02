// @flow

import type {Dispatch} from 'redux';
import {applyMiddleware, compose, createStore} from 'redux';
import type {ClientState} from './reducers/root';
import {rootReducer} from './reducers/root';
import {websocketMiddleware} from './middleware/websocket';
import type {ClientAction} from './actions';
import queryString from 'query-string';

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

export const store = createStore<ClientState,
    ClientAction,
    Dispatch<ClientAction>>(
    rootReducer,
    compose(
        applyMiddleware(
            websocketMiddleware({
                token: getIdToken(),
                url: wsUrl,
            })
        ),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);


