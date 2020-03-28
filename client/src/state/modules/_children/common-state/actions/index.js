// @flow


import type { ClientActionCreator } from '../../../../types';
import type {
    ClientRequestBuildingUpgradeAction,
    ClientRequestCityCreationAction,
    ClientRequestCityNameChangeAction,
    ClientRequestOrderCreationAction,
    ClientUpdateStateAction,
} from './types';
import {
    REQUEST_BUILDING_UPGRADE,
    REQUEST_CITY_CREATION,
    REQUEST_CITY_NAME_CHANGE,
    REQUEST_ORDER_CREATION,
    UPDATE_STATE,
} from './types';


const requestBuildingUpgrade: ClientActionCreator<ClientRequestBuildingUpgradeAction> = (payload) => {
    return {
        type: REQUEST_BUILDING_UPGRADE,
        payload,
    };
};

const requestCityCreation: ClientActionCreator<ClientRequestCityCreationAction> = (payload) => {
    return {
        type: REQUEST_CITY_CREATION,
        payload,
    };
};

const requestCityNameChange: ClientActionCreator<ClientRequestCityNameChangeAction> = (payload) => {
    return {
        type: REQUEST_CITY_NAME_CHANGE,
        payload,
    };
};

const updateState: ClientActionCreator<ClientUpdateStateAction> = (payload) => {
    return {
        type: UPDATE_STATE,
        payload,
    };
};

const requestOrderCreation: ClientActionCreator<ClientRequestOrderCreationAction> = (payload) => {
    return {
        type: REQUEST_ORDER_CREATION,
        payload,
    };
};

export const commonStateActions = {
    requestBuildingUpgrade,
    requestCityCreation,
    requestCityNameChange,
    requestOrderCreation,
    updateState,
};
