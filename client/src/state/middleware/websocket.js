/**
 * @flow
 */

import Socket from 'simple-websocket';
import {store} from '../store';
import type {Middleware} from 'redux';
import type {ClientState} from '../reducers/root';
import type {ClientAction} from '../actions';
import {updateState} from '../actions';
import type {
    ServerAction,
    ServerResponse
} from '../../../../common/src/actions';
import {
    changeCityName,
    getCurrentState,
    parseServerResponse,
    upgradeBuilding
} from '../../../../common/src/actions';


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

        const serverResponse: ServerResponse = parseServerResponse({json: dataString});

        switch (serverResponse.request.type) {
            case 'GET_CURRENT_STATE':
            case 'EXECUTE_TIME_STEP':
            case 'UPGRADE_BUILDING':
            case 'CHANGE_CITY_NAME': {
                store.dispatch(updateState({serverState: serverResponse.state}));
                return;
            }
            default: {
                console.error(
                    `unsupported response type received from server: ${serverResponse.request.type}`
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
                                cityId: action.payload.cityId,
                                playerId: '1',
                            }), socket
                        });
                        break;
                    }
                    case 'REQUEST_CITY_NAME_CHANGE': {
                        send({
                            action: changeCityName({
                                cityId: action.payload.cityId,
                                name: action.payload.name,
                                playerId: '1',
                            }), socket
                        });
                        break;
                    }
                }
                return next(action);
            };
        };
    };

    return middleware;
};
