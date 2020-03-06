// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/style.css';
import {AppComponent} from './components/app';
import {Provider} from 'react-redux';
// $FlowFixMe
import * as serviceWorker from './service-worker';
import {store} from './state/store';

const rootElement = document.getElementById('root');

if (rootElement == null) {
    throw Error('no root element in the document');
}

ReactDOM.render(
    <Provider store={store}>
        <AppComponent/>
    </Provider>,
    rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
