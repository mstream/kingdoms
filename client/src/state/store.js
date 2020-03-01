// @flow

import type {Dispatch} from 'redux';
import {applyMiddleware, compose, createStore} from 'redux';
import type {ClientState} from './reducers/root';
import {rootReducer} from './reducers/root';
import {websocketMiddleware} from './middleware/websocket';
import type {ClientAction} from './actions';
import queryString from 'query-string';


const authUrl = `https://kingdoms.auth.eu-west-1.amazoncognito.com/login?client_id=5ujsbhm0e966tcue4cca3dkmut&response_type=token&scope=email+openid&redirect_uri=${window.location.origin}`;
const wsUrl = `wss://fyl4du2353.execute-api.eu-west-1.amazonaws.com/Prod`;

const getIdToken = (): string => {
    const locationHash = queryString.parse(window.location.hash);
    const idToken = locationHash['id_token'];
    if (typeof idToken !== 'string') {
        console.log('no id token: redirecting to the authentication website');
        window.location.replace(authUrl);
        return '';
    } else {
        return idToken;
    }
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


