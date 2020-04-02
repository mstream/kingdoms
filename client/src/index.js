// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/style.css';
import { AppComponent } from './components/app';
import { Provider } from 'react-redux';
// $FlowFixMe
import * as serviceWorker from './service-worker';
import { createClientStore } from './state/store';
import { getIdTokenInfo } from './util';

const rootElement = document.getElementById('root');

if (rootElement == null) {
    throw Error('no root element in the document');
}

const tokenInfo = getIdTokenInfo({ location: window.location });

if (tokenInfo != null) {
    const store = createClientStore({
        location: window.location,
        tokenInfo,
    });

    ReactDOM.render(
        <Provider store={store}>
            <AppComponent />
        </Provider>,
        rootElement,
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
