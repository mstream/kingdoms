/**
 * @flow
 */

import Socket from 'simple-websocket';
import {store} from '../store';
import type {Middleware} from 'redux';
import type {ClientState} from '../reducers/root';
import type {ClientAction} from '../actions';
import {updateState} from '../actions';
import type {ServerAction} from '../../../../common/src/actions';
import {getCurrentState, upgradeBuilding} from '../../../../common/src/actions';

const send = ({action, socket}: { action: ServerAction, socket: Socket }): void => {
    socket.send(
        JSON.stringify({
            message: 'sendmessage',
            data: action,
        })
    );
};

export const websocketMiddleware = ({url}: { url: string }) => {
    const socket = new Socket(url);

    socket.on('connect', () => {
        console.log(`ws connection established: ${url}`);
        send({action: getCurrentState(), socket});
    });

    socket.on('close', () => {
        console.log(`ws connection closed: ${url}`);
    });

    socket.on('error', error => {
        console.error(error.stack);
    });

    socket.on('data', rawData => {
        const dataString = rawData.toString();

        console.log('ws data received: ' + dataString);

        const data = JSON.parse(dataString);

        switch (data.request.type) {
            case 'GET_CURRENT_STATE':
            case 'EXECUTE_TIME_STEP':
            case 'UPGRADE_BUILDING': {
                store.dispatch(updateState({serverState: data.state}));
                return;
            }
            default: {
                console.error(
                    `unknown data type received from server: ${data.request.type}`
                );
            }
        }
    });

    const middleware: Middleware<ClientState, ClientAction> = store => {
        return next => {
            return action => {
                switch (action.type) {
                    case 'REQUEST_BUILDING_UPGRADE': {
                        send({
                            action: upgradeBuilding({
                                buildingType: action.payload.buildingType,
                                cityId: action.payload.cityId
                            }), socket
                        });
                    }
                }
                return next(action);
            };
        };
    };

    return middleware;
};
