/**
 * @flow
 */

import Socket from 'simple-websocket';
import {store} from '../store';
import type {Action, State} from '../../types';
import type {Middleware} from 'redux';

export const websocketMiddleware = ({url}: { url: string }) => {
    const socket = new Socket(url);

    socket.on('connect', () => {
        console.log(`ws connection established: ${url}`);
        socket.send(JSON.stringify({
            message: 'sendmessage',
            data: {type: 'STATE_UPDATE_REQUEST'}
        }));
    });

    socket.on('close', () => {
        console.log(`ws connection closed: ${url}`);
    });

    socket.on('error', (error) => {
        console.error(error.stack);
    });

    socket.on('data', (rawData) => {
        const dataString = rawData.toString();

        console.log('ws data received: ' + dataString);

        const data = JSON.parse(dataString);

        switch (data.type) {
            case 'STATE_UPDATE': {
                store.dispatch({
                    type: 'SERVER_STATE_UPDATED',
                    payload: data.payload
                });
                return;
            }
            default: {
                console.error(`unknown data type received from server: ${data.type}`);
            }
        }
    });

    const middleware: Middleware<State, Action> =
        (store) => {
            return (next) => {
                return (action) => {
                    return next(action);
                };
            };
        };

    return middleware;
};

