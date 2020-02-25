/**
 * @flow
 */

import type {ServerState} from './state';

export type ServerDummyAction = {
    type: '_DUMMY_',
};

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
    }
};

export type ServerChangeCityNameAction = {
    type: 'CHANGE_CITY_NAME',
    payload: {
        cityId: string,
        name: string,
    }
};

export type ServerAction =
    | ServerChangeCityNameAction
    | ServerDummyAction
    | ServerGetCurrentStateAction
    | ServerResetStateAction
    | ServerExecuteTimeStepAction
    | ServerUpgradeBuildingAction;

export const changeCityName = ({cityId, name}: { cityId: string, name: string }): ServerChangeCityNameAction => {
    return {
        type: 'CHANGE_CITY_NAME',
        payload: {
            cityId,
            name,
        }
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

export const upgradeBuilding = ({cityId, buildingType}: { cityId: string, buildingType: string }): ServerUpgradeBuildingAction => {
    return {
        type: 'UPGRADE_BUILDING',
        payload: {
            cityId,
            buildingType,
        }
    };
};

export type ServerRequest = ServerAction

export type ServerResponse = {
    request: ServerAction,
    errors: $ReadOnlyArray<string>,
    state: ServerState,
}

