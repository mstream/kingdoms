// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/style.css';
import {
    AppComponent,
} from './components/app';
import {
    Provider,
} from 'react-redux';
import {
    createClientStore,
} from './state/store';
import type {
    Config,
} from './config/types';
import {
    createConfig,
} from './config';
import type {
    Logger,
} from '../../common/src/logging/types';
import {
    createLogger,
} from '../../common/src/logging';
import {
    getIdTokenInfo, getWorldId,
} from './location';

const config: Config = createConfig();

const logger: Logger = createLogger(
    {
        config,
    },
);

logger.info(
    `Using configuration: %o`,
    config,
);

const rootElement = document.getElementById(
    `root`,
);

if ( rootElement == null ) {

    const errorMessage = `no root element in the document`;

    logger.error(
        errorMessage,
    );

    throw Error(
        errorMessage,
    );

}

const tokenInfo = getIdTokenInfo(
    {
        config,
        location: window.location,
        logger,
    },
);

const worldId = getWorldId(
    {
        location: window.location,
        logger,
    },
);

if ( worldId == null ) {

    const errorMessage = `the location does not contain the world id`;

    logger.error(
        errorMessage,
    );

    throw Error(
        errorMessage,
    );

}

if ( tokenInfo == null ) {

    logger.debug(
        `Not rendering the application as the redirection should be happening`,
    );

} else {

    const store = createClientStore(
        {
            config,
            location: window.location,
            logger,
            tokenInfo,
            worldId,
        },
    );

    logger.debug(
        `client store has been successfully created`,
    );

    ReactDOM.render(
        <Provider store={store}>
            <AppComponent/>
        </Provider>,
        rootElement,
    );

}
