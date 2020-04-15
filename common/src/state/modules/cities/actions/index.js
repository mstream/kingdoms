// @flow

import {
    ABANDON_CITY,
    CHANGE_CITY_NAME,
    CREATE_CITY,
    UPGRADE_BUILDING,
} from './types';
import {
    EXECUTE_TIME_STEP,
} from '../../time/actions';
import type {
    CommonAbandonCityAction,
    CommonChangeCityNameAction,
    CommonCreateCityAction,
    CommonUpgradeBuildingAction,
} from './types';
import type {
    CommonActionCreator,
} from '../../../types';
import type {
    CommonExecuteTimeStepAction,
} from '../../time/actions';

export const abandonCity: CommonActionCreator< CommonAbandonCityAction > = (
    payload,
) => {

    return {
        payload,
        type: ABANDON_CITY,
    };

};

export const changeCityName: CommonActionCreator< CommonChangeCityNameAction > = (
    payload,
) => {

    return {
        payload,
        type: CHANGE_CITY_NAME,
    };

};

export const createCity: CommonActionCreator< CommonCreateCityAction > = (
    payload,
) => {

    return {
        payload,
        type: CREATE_CITY,
    };

};

export const executeTimeStep: CommonActionCreator< CommonExecuteTimeStepAction > = (
    payload,
) => {

    return {
        payload,
        type: EXECUTE_TIME_STEP,
    };

};

export const upgradeBuilding: CommonActionCreator< CommonUpgradeBuildingAction > = (
    payload,
) => {

    return {
        payload,
        type: UPGRADE_BUILDING,
    };

};
