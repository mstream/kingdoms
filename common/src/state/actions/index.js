// @flow

import type {
    CommonAbandonCityAction,
    CommonChangeCityNameAction,
    CommonCreateCityAction,
    CommonCreateOrderAction,
    CommonUpgradeBuildingAction,
} from '../modules/cities/actions';
import {
    ABANDON_CITY,
    CHANGE_CITY_NAME,
    CREATE_CITY,
    CREATE_ORDER,
    UPGRADE_BUILDING,
} from '../modules/cities/actions';
import type { CommonExecuteTimeStepAction } from '../modules/time/actions';
import { EXECUTE_TIME_STEP } from '../modules/time/actions';
import type {
    CommonActionCreator,
    CommonDummyAction,
    CommonGetCurrentStateAction,
    CommonResetStateAction,
} from './types';
import { DUMMY, GET_CURRENT_STATE, RESET_STATE } from './types';


export const abandonCity: CommonActionCreator<CommonAbandonCityAction> = (payload) => {
    return {
        type: ABANDON_CITY,
        payload,
    };
};

export const changeCityName: CommonActionCreator<CommonChangeCityNameAction> = (payload) => {
    return {
        type: CHANGE_CITY_NAME,
        payload,
    };
};

export const createCity: CommonActionCreator<CommonCreateCityAction> = (payload) => {
    return {
        type: CREATE_CITY,
        payload,
    };
};

export const createOrder: CommonActionCreator<CommonCreateOrderAction> = (payload) => {
    return {
        type: CREATE_ORDER,
        payload,
    };
};

export const dummy: CommonActionCreator<CommonDummyAction> = () => {
    return {
        type: DUMMY,
        payload: undefined,
    };
};

export const executeTimeStep: CommonActionCreator<CommonExecuteTimeStepAction> = (payload) => {
    return {
        type: EXECUTE_TIME_STEP,
        payload,
    };
};

export const getCurrentState: CommonActionCreator<CommonGetCurrentStateAction> = () => {
    return {
        type: GET_CURRENT_STATE,
        payload: undefined,
    };
};

export const resetState: CommonActionCreator<CommonResetStateAction> = () => {
    return {
        type: RESET_STATE,
        payload: undefined,
    };
};

export const upgradeBuilding: CommonActionCreator<CommonUpgradeBuildingAction> = (payload) => {
    return {
        type: UPGRADE_BUILDING,
        payload,
    };
};


