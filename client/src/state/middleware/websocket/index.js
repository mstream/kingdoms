// @flow

import Socket from 'simple-websocket';
import type {
    Middleware,
} from 'redux';
import type {
    ClientAction, ClientState, ClientStore,
} from '../../types';
import {
    createOnCloseHandler,
} from './socket-event-handlers/on-close';
import {
    createOnDataHandler,
} from './socket-event-handlers/on-data';
import {
    createOnConnectHandler,
} from './socket-event-handlers/on-connect';
import {
    createOnErrorHandler,
} from './socket-event-handlers/on-error';
import {
    clientActionHandler,
} from './client-action-handler';
import type {
    IdTokenInfo,
} from '../../../types';
import type {
    Config,
} from '../../../config/types';
import {
    Logger,
} from 'aws-sdk/lib/config';

export const createWebsocketMiddleware = (
    {
        config,
        location,
        logger,
        tokenInfo,
        url,
        worldId,
    }: {
        config: Config,
        location: Location,
        logger: Logger,
        tokenInfo: IdTokenInfo,
        url: string,
        worldId: string,
    },
): Middleware< ClientState, ClientAction > => {

    const socket = new Socket(
        `${ url }?token=${ tokenInfo.token }`,
    );

    // $FlowFixMe
    const middleware: Middleware< ClientState, ClientAction > = (
        store: ClientStore,
    ) => {

        socket.on(
            `connect`,
            createOnConnectHandler(
                {
                    logger,
                    socket,
                    store,
                    username: tokenInfo.username,
                    worldId,
                },
            ),
        );

        socket.on(
            `close`,
            createOnCloseHandler(
                {
                    logger,
                },
            ),
        );

        socket.on(
            `data`,
            createOnDataHandler(
                {
                    logger,
                    store,
                },
            ),
        );

        socket.on(
            `error`,
            createOnErrorHandler(
                {
                    config,
                    location,
                    logger,
                    store,
                },
            ),
        );

        return (
            next,
        ) => {

            return (
                action: ClientAction,
            ) => {

                clientActionHandler(
                    {
                        action,
                        socket,
                        username: tokenInfo.username,
                        worldId,
                    },
                );

                return next(
                    action,
                );

            };

        };

    };

    return middleware;

};
