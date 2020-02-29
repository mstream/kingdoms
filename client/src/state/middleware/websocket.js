/**
 * @flow
 */

import Socket from 'simple-websocket';
import type {Middleware} from 'redux';
import type {ClientState} from '../reducers/root';
import type {ClientAction} from '../actions';
import {loadPlayer, updateState} from '../actions';
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
import jwt from 'jsonwebtoken';


const send = ({action, socket}: { action: ServerAction, socket: Socket }): void => {
    socket.send(
        JSON.stringify({
            message: 'sendmessage',
            data: action,
        })
    );
};

const createOnDataHandler = (store) => {
    return (data) => {
        const dataString = data.toString();

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
    };
};

export const websocketMiddleware = ({token, url}: { token: string, url: string }) => {

    // TODO verify using a public key
    const userInfo = jwt.decode(token);

    if (userInfo == null || userInfo['cognito:username'] == null) {
        throw Error(`cannot retrieve the username from the token`);
    }

    const username = userInfo['cognito:username'];

    const middleware: Middleware<ClientState, ClientAction> = store => {
        const socket = new Socket(`${url}?token=${token}`);

        socket.on('connect', () => {
            console.log(`ws connection established: ${url}`);
            send({action: getCurrentState(), socket});
            store.dispatch(loadPlayer({name: username}));
        });

        socket.on('close', () => {
            console.log(`ws connection closed: ${url}`);
        });

        socket.on('error', error => {
            console.error('ws error: ' + error.message);
            console.error(error.stack);
        });

        socket.on('data', createOnDataHandler(store));

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
