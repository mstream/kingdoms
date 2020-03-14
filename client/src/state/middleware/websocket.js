// @flow

import Socket from 'simple-websocket';
import type { Middleware } from 'redux';
import type { ClientAction } from '../actions';
import {
    loadPlayer,
    REQUEST_BUILDING_UPGRADE,
    REQUEST_CITY_CREATION,
    REQUEST_CITY_NAME_CHANGE,
    updateState,
} from '../actions';
import type {
    ServerAction,
    ServerResponse,
} from '../../../../common/src/actions';
import {
    changeCityName,
    createCity,
    getCurrentState,
    parseServerResponse,
    upgradeBuilding,
} from '../../../../common/src/actions';
import jwt from 'jsonwebtoken';
import { generateId, stringifyJson } from '../../../../common/src/util';
import type { ClientState } from '../modules/root';


const send = ({ action, socket }: { action: ServerAction, socket: Socket }): void => {
    socket.send(
        stringifyJson({
            value: {
                message: 'sendmessage',
                data: action,
            },
        }),
    );
};

const createOnDataHandler = (store) => {
    return (data) => {
        const dataString = data.toString();

        console.log('ws data received: ' + dataString);

        const serverResponse: ServerResponse = parseServerResponse({ json: dataString });

        switch (serverResponse.request.type) {
            case 'CHANGE_CITY_NAME':
            case 'CREATE_CITY':
            case 'GET_CURRENT_STATE':
            case 'EXECUTE_TIME_STEP':
            case 'UPGRADE_BUILDING': {
                store.dispatch(updateState({ commonState: serverResponse.state }));
                return;
            }
            default: {
                console.error(
                    `unsupported response type received from server: ${serverResponse.request.type}`,
                );
            }
        }
    };
};

export const websocketMiddleware = ({ token, url }: { token: string, url: string }) => {

    // TODO verify using a public key
    const userInfo = jwt.decode(token);

    if (userInfo == null || userInfo['cognito:username'] == null) {
        throw Error(`cannot retrieve the username from the token`);
    }

    const username = userInfo['cognito:username'];

    // $FlowFixMe
    const middleware: Middleware<ClientState, ClientAction> = store => {
        const socket = new Socket(`${url}?token=${token}`);

        socket.on('connect', () => {
            console.log(`ws connection established: ${url}`);
            send({ action: getCurrentState(), socket });
            store.dispatch(loadPlayer({ name: username }));
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
                    case REQUEST_BUILDING_UPGRADE: {
                        send({
                            action: upgradeBuilding({
                                buildingType: action.payload.buildingType,
                                cityId: action.payload.cityId,
                                playerId: username,
                            }), socket,
                        });
                        break;
                    }
                    case REQUEST_CITY_NAME_CHANGE: {
                        send({
                            action: changeCityName({
                                cityId: action.payload.cityId,
                                name: action.payload.name,
                                playerId: username,
                            }), socket,
                        });
                        break;
                    }
                    case REQUEST_CITY_CREATION: {
                        send({
                            action: createCity({
                                cityId: generateId(),
                                cityName: action.payload.name,
                                playerId: username,
                            }), socket,
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
