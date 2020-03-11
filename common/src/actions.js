// @flow
// @flow-runtime

import {parseJson} from './util';
import type {Type} from 'flow-runtime';
import {reify} from 'flow-runtime';
import type { CommonState } from './state/state';

export type ServerDummyAction = $ReadOnly<{
    type: 'DUMMY',
    payload: void,
}>;

export type ServerAbandonCityAction = $ReadOnly<{
    type: 'ABANDON_CITY',
    payload: {
        cityId: string,
        playerId: string,
    },
}>;

export type ServerCreateCityAction = $ReadOnly<{
    type: 'CREATE_CITY',
    payload: {
        cityId: string,
        cityName: string,
        playerId: string,
    },
}>;

export type ServerGetCurrentStateAction = $ReadOnly<{
    type: 'GET_CURRENT_STATE',
}>;

export type ServerResetStateAction = $ReadOnly<{
    type: 'RESET_STATE',
}>;

export type ServerExecuteTimeStepAction = $ReadOnly<{
    type: 'EXECUTE_TIME_STEP',
    payload: string
}>;

export type ServerUpgradeBuildingAction = $ReadOnly<{
    type: 'UPGRADE_BUILDING',
    payload: {
        buildingType: string,
        cityId: string,
        playerId: string,
    }
}>;

export type ServerChangeCityNameAction = $ReadOnly<{
    type: 'CHANGE_CITY_NAME',
    payload: {
        cityId: string,
        name: string,
        playerId: string,
    }
}>;

export type ServerAction =
    | ServerAbandonCityAction
    | ServerCreateCityAction
    | ServerChangeCityNameAction
    | ServerDummyAction
    | ServerGetCurrentStateAction
    | ServerResetStateAction
    | ServerExecuteTimeStepAction
    | ServerUpgradeBuildingAction;

export const abandonCity = ({cityId, playerId}: { cityId: string, playerId: string }): ServerAbandonCityAction => {
    return {
        type: 'ABANDON_CITY',
        payload: {
            cityId,
            playerId,
        },
    };
};

export const createCity = ({cityId, cityName, playerId}: { cityId: string, cityName: string, playerId: string }): ServerCreateCityAction => {
    return {
        type: 'CREATE_CITY',
        payload: {
            cityId,
            cityName,
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

export type ServerRequest = ServerAction

export const ServerRequestType = (reify: Type<ServerRequest>);

export type ServerResponse = {
    request: ServerAction,
    errors: $ReadOnlyArray<string>,
    state: CommonState,
}

const ServerResponseType = (reify: Type<ServerResponse>);

export const parseServerResponse = ({json}: { json: string }): ServerResponse => {
    const object = parseJson({json});
    return ServerResponseType.assert(object);
};

export const dummy = (): ServerDummyAction => {
    return {
        type: 'DUMMY',
        payload: undefined,
    }
};
