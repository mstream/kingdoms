// @flow

import {
    applyMiddleware, createStore,
} from 'redux';
import {
    composeWithDevTools,
} from 'redux-devtools-extension';
import {
    createLocationMiddleware,
} from './middleware/location';
import {
    createWebsocketMiddleware,
} from './middleware/websocket';
import {
    rootReducer,
} from './modules/reducer';
import type {
    ClientAction, ClientState, ClientStore,
} from './types';
import type {
    Config,
} from '../config/types';
import type {
    Dispatch,
} from 'redux';
import type {
    IdTokenInfo,
} from '../types';
import type {
    Logger,
} from '../../../common/src/logging/types';

const composeEnhancers = composeWithDevTools(
    {
        trace: true,
    },
);

export const createClientStore = (
    {
        config,
        location,
        logger,
        tokenInfo,
        worldId,
    }: {
        config: Config,
        location: Location,
        logger: Logger,
        tokenInfo: IdTokenInfo,
        worldId: string,
    },
): ClientStore => {

    const websocketMiddleware = createWebsocketMiddleware(
        {
            config,
            location,
            logger,
            tokenInfo,
            url: config.wsUrl,
            worldId,
        },
    );

    const locationMiddleWare = createLocationMiddleware(
        {
            config,
            location,
            logger,
        },
    );

    return createStore<ClientState, ClientAction, Dispatch< ClientAction >>(
        rootReducer,
        composeEnhancers(
            applyMiddleware(
                websocketMiddleware,
                locationMiddleWare,
            ),
        ),
    );

};
