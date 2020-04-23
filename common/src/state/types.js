// @flow

import {
    ABANDON_CITY,
    CHANGE_CITY_NAME,
    CREATE_CITY,
    UPGRADE_BUILDING,
} from './modules/_children/cities/actions/types';
import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from './modules/_children/orders/actions/types';
import {
    DUMMY, GET_CURRENT_STATE, RESET_STATE,
} from './actions/types';
import {
    EXECUTE_TIME_STEP,
} from './modules/_children/time/actions';
import type {
    CommonAbandonCityAction,
    CommonChangeCityNameAction,
    CommonCreateCityAction,
    CommonUpgradeBuildingAction,
} from './modules/_children/cities/actions/types';
import type {
    CommonCreateScheduledAttackOrderAction,
} from './modules/_children/orders/actions/types';
import type {
    CommonDummyAction,
    CommonGetCurrentStateAction,
    CommonResetStateAction,
} from './actions/types';
import type {
    CommonExecuteTimeStepAction,
} from './modules/_children/time/actions';

export type CommonActionKey =
    | typeof ABANDON_CITY
    | typeof CHANGE_CITY_NAME
    | typeof CREATE_CITY
    | typeof CREATE_SCHEDULED_ATTACK_ORDER
    | typeof DUMMY
    | typeof EXECUTE_TIME_STEP
    | typeof GET_CURRENT_STATE
    | typeof RESET_STATE
    | typeof UPGRADE_BUILDING;

export type CommonPlayerAction =
    | CommonAbandonCityAction
    | CommonChangeCityNameAction
    | CommonCreateCityAction
    | CommonCreateScheduledAttackOrderAction
    | CommonGetCurrentStateAction
    | CommonUpgradeBuildingAction;

export type CommonAction =
    | CommonPlayerAction
    | CommonDummyAction
    | CommonExecuteTimeStepAction
    | CommonResetStateAction;

export type CommonActionCreator<A: CommonAction> = (
    $PropertyType< A, 'payload' >,
) => A;
