// @flow

import Socket from 'simple-websocket';
import type { Middleware } from 'redux';
import jwt from 'jsonwebtoken';
import type { ClientAction, ClientState, ClientStore } from '../../types';
import { createOnCloseHandler } from './socket-event-handlers/on-close';
import { createOnDataHandler } from './socket-event-handlers/on-data';
import { createOnConnectHandler } from './socket-event-handlers/on-connect';
import { createOnErrorHandler } from './socket-event-handlers/on-error';
import { clientActionHandler } from './client-action-handler';


export const websocketMiddleware = (
    {
        token,
        url,
    }: {
        token: string,
        url: string
    },
): Middleware<ClientState, ClientAction> => {

    const userInfo = jwt.decode(token);

    if (userInfo == null || userInfo['cognito:username'] == null) {
        throw Error(`cannot retrieve the username from the token`);
    }

    const username = userInfo['cognito:username'];

    // $FlowFixMe
    const middleware: Middleware<ClientState, ClientAction> = (store: ClientStore) => {
        const socket = new Socket(`${url}?token=${token}`);

        socket.on('connect', createOnConnectHandler({
            store,
            socket,
            username,
        }));

        socket.on('close', createOnCloseHandler({ store }));
        socket.on('error', createOnErrorHandler({ store }));
        socket.on('data', createOnDataHandler({ store }));

        return next => {
            return action => {
                clientActionHandler({
                    action,
                    socket,
                    username,
                });

                return next(action);
            };
        };
    };

    return middleware;
};
