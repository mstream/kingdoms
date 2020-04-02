// @flow

import type {
    CommonAbandonCityAction,
    CommonChangeCityNameAction,
    CommonCreateCityAction,
    CommonUpgradeBuildingAction,
} from './types';
import {
    ABANDON_CITY,
    CHANGE_CITY_NAME,
    CREATE_CITY,
    UPGRADE_BUILDING,
} from './types';
import type { CommonExecuteTimeStepAction } from '../../time/actions';
import { EXECUTE_TIME_STEP } from '../../time/actions';
import type { CommonActionCreator } from '../../../types';

export const abandonCity: CommonActionCreator<CommonAbandonCityAction> = (
    payload,
) => {
    return {
        type: ABANDON_CITY,
        payload,
    };
};

export const changeCityName: CommonActionCreator<CommonChangeCityNameAction> = (
    payload,
) => {
    return {
        type: CHANGE_CITY_NAME,
        payload,
    };
};

export const createCity: CommonActionCreator<CommonCreateCityAction> = (
    payload,
) => {
    return {
        type: CREATE_CITY,
        payload,
    };
};

export const executeTimeStep: CommonActionCreator<CommonExecuteTimeStepAction> = (
    payload,
) => {
    return {
        type: EXECUTE_TIME_STEP,
        payload,
    };
};

export const upgradeBuilding: CommonActionCreator<CommonUpgradeBuildingAction> = (
    payload,
) => {
    return {
        type: UPGRADE_BUILDING,
        payload,
    };
};
