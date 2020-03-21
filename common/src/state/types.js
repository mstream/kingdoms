// @flow

import type {
    CommonAbandonCityAction,
    CommonChangeCityNameAction,
    CommonCreateCityAction,
    CommonUpgradeBuildingAction,
} from './modules/cities/actions/types';
import type { CommonCreateOrderAction } from './modules/orders/actions/types';
import type { CommonExecuteTimeStepAction } from './modules/time/actions';
import type {
    CommonDummyAction,
    CommonGetCurrentStateAction,
    CommonResetStateAction,
} from './actions/types';

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