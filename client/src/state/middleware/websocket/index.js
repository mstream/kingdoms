// @flow

import Socket from 'simple-websocket';
import type { Middleware } from 'redux';
import type { ClientAction, ClientState, ClientStore } from '../../types';
import { createOnCloseHandler } from './socket-event-handlers/on-close';
import { createOnDataHandler } from './socket-event-handlers/on-data';
import { createOnConnectHandler } from './socket-event-handlers/on-connect';
import { createOnErrorHandler } from './socket-event-handlers/on-error';
import { clientActionHandler } from './client-action-handler';
import type { IdTokenInfo } from '../../../types';


export const websocketMiddleware = (
    {
        location,
        tokenInfo,
        url,
    }: {
        location: Location,
        tokenInfo: IdTokenInfo,
        url: string
    },
): Middleware<ClientState, ClientAction> => {

    const socket = new Socket(`${url}?token=${tokenInfo.token}`);

    // $FlowFixMe
    const middleware: Middleware<ClientState, ClientAction> = (store: ClientStore) => {

        socket.on('connect', createOnConnectHandler({
            store,
            socket,
            username: tokenInfo.username,
        }));

        socket.on('close', createOnCloseHandler({ store }));
        socket.on('data', createOnDataHandler({ store }));
        socket.on('error', createOnErrorHandler({ store }));

        return next => {
            return action => {
                clientActionHandler({
                    action,
                    socket,
                    username: tokenInfo.username,
                });

                return next(action);
            };
        };
    };

    return middleware;
};
