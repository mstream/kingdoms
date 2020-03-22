// @flow


import type { ClientActionCreator } from '../../../types';
import type {
    ClientRequestBuildingUpgradeAction,
    ClientRequestCityCreationAction,
    ClientRequestCityNameChangeAction,
    ClientUpdateStateAction,
} from './types';
import {
    REQUEST_BUILDING_UPGRADE,
    REQUEST_CITY_CREATION,
    REQUEST_CITY_NAME_CHANGE,
    UPDATE_STATE,
} from './types';


export const requestBuildingUpgrade: ClientActionCreator<ClientRequestBuildingUpgradeAction> = (payload) => {
    return {
        type: REQUEST_BUILDING_UPGRADE,
        payload,
    };
};

export const requestCityCreation: ClientActionCreator<ClientRequestCityCreationAction> = (payload) => {
    return {
        type: REQUEST_CITY_CREATION,
        payload,
    };
};

export const requestCityNameChange: ClientActionCreator<ClientRequestCityNameChangeAction> = (payload) => {
    return {
        type: REQUEST_CITY_NAME_CHANGE,
        payload,
    };
};

export const updateState: ClientActionCreator<ClientUpdateStateAction> = (payload) => {
    return {
        type: UPDATE_STATE,
        payload,
    };
};

