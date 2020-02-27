/**
 * @flow
 */

import type {ServerState} from './state';
import {parseJson} from './util';
import type {Type} from 'flow-runtime';
import {reify} from 'flow-runtime';

export type ServerDummyAction = {
    type: '_DUMMY_',
};

export type ServerAbandonCityAction = {
    type: 'ABANDON_CITY',
    payload: {
        cityId: string,
        playerId: string,
    },
}

export type ServerGetCurrentStateAction = {
    type: 'GET_CURRENT_STATE',
}

export type ServerResetStateAction = {
    type: 'RESET_STATE',
}

export type ServerExecuteTimeStepAction = {
    type: 'EXECUTE_TIME_STEP',
    payload: string
};

export type ServerUpgradeBuildingAction = {
    type: 'UPGRADE_BUILDING',
    payload: {
        buildingType: string,
        cityId: string,
        playerId: string,
    }
};

export type ServerChangeCityNameAction = {
    type: 'CHANGE_CITY_NAME',
    payload: {
        cityId: string,
        name: string,
        playerId: string,
    }
};

export type ServerAction =
    | ServerAbandonCityAction
    | ServerChangeCityNameAction
    | ServerDummyAction
    | ServerGetCurrentStateAction
    | ServerResetStateAction
    | ServerExecuteTimeStepAction
    | ServerUpgradeBuildingAction;

export const changeCityName = ({cityId, name, playerId}: { cityId: string, name: string, playerId: string }): ServerChangeCityNameAction => {
    return {
        type: 'CHANGE_CITY_NAME',
        payload: {
            cityId,
            name,
            playerId,
        }
    };
};

export const abandonCity = ({cityId, playerId}: { cityId: string, playerId: string }): ServerAbandonCityAction => {
    return {
        type: 'ABANDON_CITY',
        payload: {
            cityId,
            playerId,
        },
    };
};

export const getCurrentState = (): ServerGetCurrentStateAction => {
    return {
        type: 'GET_CURRENT_STATE'
    };
};


export const resetState = (): ServerResetStateAction => {
    return {
        type: 'RESET_STATE'
    };
};

export const executeTimeStep = ({time}: { time: string }): ServerExecuteTimeStepAction => {
    return {
        type: 'EXECUTE_TIME_STEP',
        payload: time
    };
};

export const upgradeBuilding = ({cityId, buildingType, playerId}: { cityId: string, buildingType: string, playerId: string }): ServerUpgradeBuildingAction => {
    return {
        type: 'UPGRADE_BUILDING',
        payload: {
            buildingType,
            cityId,
            playerId,
        }
    };
};

export type ServerRequest = ServerAction

export const ServerRequestType = (reify: Type<ServerRequest>);

export type ServerResponse = {
    request: ServerAction,
    errors: $ReadOnlyArray<string>,
    state: ServerState,
}

const ServerResponseType = (reify: Type<ServerResponse>);

export const parseServerResponse = ({json}: { json: string }): ServerResponse => {
    const object = parseJson({json});
    return ServerResponseType.assert(object);
};

