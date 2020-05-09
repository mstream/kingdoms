// @flow

import '../../assets/css/main.css';
import {
    MainAppComponent,
} from '../../components/main-app';
import {
    Provider,
} from 'react-redux';
import {
    createClientStore,
} from './state/store';
import {
    createConfig,
} from '../../config';
import {
    createLogger,
} from '../../../../common/src/logging';
import {
    getIdTokenInfo,
} from '../../location';
import {
    httpClient,
} from '../../clients/http';
import React from 'react';
import ReactDOM from 'react-dom';
import type {
    Config,
} from '../../config/types';
import type {
    Logger,
} from '../../../../common/src/logging/types';

const config: Config = createConfig();

const logger: Logger = createLogger(
    {
        config,
    },
);

logger.info(
    {
        interpolationValues: [
            config,
        ],
        message: `Using configuration: %o`,
    },
);

const rootElement = document.getElementById(
    `root`,
);

if ( rootElement == null ) {

    const errorMessage = `no root element in the document`;

    logger.error(
        {
            message: errorMessage,
        },
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

if ( tokenInfo == null ) {

    logger.debug(
        {
            message: `Not rendering as a redirection should be happening`,
        },
    );

} else {

    const store = createClientStore(
        {
            config,
            httpClient,
            logger,
        },
    );

    logger.debug(
        {
            message: `client store has been successfully created`,
        },
    );

    ReactDOM.render(
        <Provider store={store}>
            <MainAppComponent/>
        </Provider>,
        rootElement,
    );

}

