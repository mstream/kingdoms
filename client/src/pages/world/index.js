// @flow

import '../../assets/css/world.css';
import {
    Provider,
} from 'react-redux';
import {
    WorldAppComponent,
} from '../../components/world-app';
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
    getIdTokenInfo, getWorldId,
} from '../../location';
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

const worldId = getWorldId(
    {
        location: window.location,
        logger,
    },
);

if ( worldId == null ) {

    const errorMessage = `the location does not contain the world id`;

    logger.error(
        {
            message: errorMessage,
        },
    );

    throw Error(
        errorMessage,
    );

}

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
            location: window.location,
            logger,
            tokenInfo,
            worldId,
        },
    );

    logger.debug(
        {
            message: `client store has been successfully created`,
        },
    );

    ReactDOM.render(
        <Provider store={store}>
            <WorldAppComponent/>
        </Provider>,
        rootElement,
    );

}

