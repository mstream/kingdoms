// @flow

import Socket from 'simple-websocket';
import type { Middleware } from 'redux';
import {
    changeCityName,
    createCity,
    upgradeBuilding,
} from '../../../../../common/src/state/modules/cities/actions';
import jwt from 'jsonwebtoken';
import { generateId, stringifyJson } from '../../../../../common/src/util';
import type { CommonAction } from '../../../../../common/src/state/types';
import type { ClientAction, ClientState, ClientStore } from '../../types';
import {
    REQUEST_BUILDING_UPGRADE,
    REQUEST_CITY_CREATION,
    REQUEST_CITY_NAME_CHANGE, REQUEST_ORDER_CREATION,
} from '../../modules/_children/common-state/actions/types';
import { createOrder } from '../../../../../common/src/state/modules/orders/actions';
import { sendMessage } from './utils';
import { createOnCloseHandler } from './handlers/on-close';
import { createOnDataHandler } from './handlers/on-data';
import { createOnConnectHandler } from './handlers/on-connect';
import { createOnErrorHandler } from './handlers/on-error';


const send = ({ action, socket }: { action: CommonAction, socket: Socket }): void => {
    socket.send(
        stringifyJson({
            value: {
                message: 'sendmessage',
                data: action,
            },
        }),
    );
};


export const websocketMiddleware = ({ token, url }: { token: string, url: string }) => {

    // TODO verify using a public key
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
                switch (action.type) {
                    case REQUEST_BUILDING_UPGRADE: {
                        sendMessage({
                            action: upgradeBuilding({
                                buildingType: action.payload.buildingType,
                                cityId: action.payload.cityId,
                                playerId: username,
                            }), socket,
                        });
                        break;
                    }
                    case REQUEST_CITY_NAME_CHANGE: {
                        sendMessage({
                            action: changeCityName({
                                cityId: action.payload.cityId,
                                name: action.payload.name,
                                playerId: username,
                            }), socket,
                        });
                        break;
                    }
                    case REQUEST_CITY_CREATION: {
                        sendMessage({
                            action: createCity({
                                cityId: generateId(),
                                name: action.payload.name,
                                playerId: username,
                            }), socket,
                        });
                        break;
                    }
                    case REQUEST_ORDER_CREATION: {
                        sendMessage({
                            action: createOrder({
                                ...action.payload,
                                orderId: generateId(),
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
