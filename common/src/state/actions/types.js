// @flow
import type {
    CommonAbandonCityAction,
    CommonChangeCityNameAction,
    CommonCreateCityAction,
    CommonCreateOrderAction,
    CommonUpgradeBuildingAction,
} from '../modules/cities/actions';
import type { CommonExecuteTimeStepAction } from '../modules/time/actions';
import type { BaseAction } from '../types';

export const DUMMY: 'DUMMY' = 'DUMMY';
export const GET_CURRENT_STATE: 'GET_CURRENT_STATE' = 'GET_CURRENT_STATE';
export const RESET_STATE: 'RESET_STATE' = 'RESET_STATE';

export type CommonDummyAction = BaseAction<typeof DUMMY, void>;

export type CommonGetCurrentStateAction = BaseAction<typeof GET_CURRENT_STATE, void>;

export type CommonResetStateAction = BaseAction<typeof RESET_STATE, void>;

export type CommonAction =
    | CommonAbandonCityAction
    | CommonChangeCityNameAction
    | CommonCreateCityAction
    | CommonCreateOrderAction
    | CommonDummyAction
    | CommonExecuteTimeStepAction
    | CommonGetCurrentStateAction
    | CommonResetStateAction
    | CommonUpgradeBuildingAction;

export type CommonActionCreator<A: CommonAction> = ($PropertyType<A, 'payload'>) => A;
