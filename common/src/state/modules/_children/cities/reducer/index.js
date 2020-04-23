// @flow

import {
    ABANDON_CITY,
    CHANGE_CITY_NAME,
    CREATE_CITY,
    UPGRADE_BUILDING,
} from '../actions/types';
import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from '../../orders/actions/types';
import {
    EXECUTE_TIME_STEP,
} from '../../time/actions';
import {
    RESET_STATE,
} from '../../../../actions/types';
import {
    abandonCityCitiesReducer,
} from './_impl/abandon-city';
import {
    changeCityNameCitiesReducer,
} from './_impl/change-city-name';
import {
    createCityCitiesReducer,
} from './_impl/create-city';
import {
    createCommonStateReducer,
} from '../../../utils';
import {
    createScheduledAttackOrderCitiesReducer,
} from './_impl/create-order';
import {
    executeTimeStepCitiesReducer,
} from './_impl/execute-time-step';
import {
    initialCommonState,
} from '../../../../index';
import {
    resetStateCitiesReducer,
} from './_impl/reset-state';
import {
    upgradeBuildingCitiesReducer,
} from './_impl/upgrade-building';
import type {
    CommonStateCities,
} from './types';

export const citiesReducer = createCommonStateReducer<CommonStateCities>(
    {
        actionReducers: {
            [ ABANDON_CITY ]                 : abandonCityCitiesReducer,
            [ CHANGE_CITY_NAME ]             : changeCityNameCitiesReducer,
            [ CREATE_CITY ]                  : createCityCitiesReducer,
            [ CREATE_SCHEDULED_ATTACK_ORDER ]: createScheduledAttackOrderCitiesReducer,
            [ EXECUTE_TIME_STEP ]            : executeTimeStepCitiesReducer,
            [ RESET_STATE ]                  : resetStateCitiesReducer,
            [ UPGRADE_BUILDING ]             : upgradeBuildingCitiesReducer,
        },
        initialState: initialCommonState.cities,
    },
);
