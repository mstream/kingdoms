// @flow

import {
    REQUEST_BUILDING_UPGRADE,
    REQUEST_CITY_CREATION,
    REQUEST_CITY_NAME_CHANGE,
    REQUEST_ORDER_CREATION,
    UPDATE_STATE,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../types';
import type {
    ClientRequestBuildingUpgradeAction,
    ClientRequestCityCreationAction,
    ClientRequestCityNameChangeAction,
    ClientRequestOrderCreationAction,
    ClientUpdateStateAction,
} from './types';

const requestBuildingUpgrade: ClientActionCreator< ClientRequestBuildingUpgradeAction > = (
    payload,
) => {

    return {
        payload,
        type: REQUEST_BUILDING_UPGRADE,
    };

};

const requestCityCreation: ClientActionCreator< ClientRequestCityCreationAction > = (
    payload,
) => {

    return {
        payload,
        type: REQUEST_CITY_CREATION,
    };

};

const requestCityNameChange: ClientActionCreator< ClientRequestCityNameChangeAction > = (
    payload,
) => {

    return {
        payload,
        type: REQUEST_CITY_NAME_CHANGE,
    };

};

const updateState: ClientActionCreator< ClientUpdateStateAction > = (
    payload,
) => {

    return {
        payload,
        type: UPDATE_STATE,
    };

};

const requestOrderCreation: ClientActionCreator< ClientRequestOrderCreationAction > = (
    payload,
) => {

    return {
        payload,
        type: REQUEST_ORDER_CREATION,
    };

};

export const commonStateActions = {
    requestBuildingUpgrade,
    requestCityCreation,
    requestCityNameChange,
    requestOrderCreation,
    updateState,
};
