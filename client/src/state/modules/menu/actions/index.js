// @flow

import type { ClientActionCreator, ClientBaseAction } from '../../types';
import type { ClientStateCityViewTab } from '../reducer/types';
import type { CommonStateUnits } from '../../../../../../common/src/state';

export const CLOSE_ATTACK_VIEW: 'CLOSE_ATTACK_VIEW' = 'CLOSE_ATTACK_VIEW';
export const CLOSE_CITY_VIEW: 'CLOSE_CITY_VIEW' = 'CLOSE_CITY_VIEW';
export const OPEN_ATTACK_VIEW: 'OPEN_ATTACK_VIEW' = 'OPEN_ATTACK_VIEW';
export const OPEN_CITY_VIEW: 'OPEN_CITY_VIEW' = 'OPEN_CITY_VIEW';
export const SELECT_ATTACK_VIEW_ATTACKING_CITY_TAB: 'SELECT_ATTACK_VIEW_ATTACKING_CITY_TAB' = 'SELECT_ATTACK_VIEW_ATTACKING_CITY_TAB';
export const SELECT_CITY_VIEW_TAB: 'SELECT_CITY_VIEW_TAB' = 'SELECT_CITY_VIEW_TAB';
export const SELECT_CITY_VIEW_UNIT_TAB: 'SELECT_CITY_VIEW_UNIT_TAB' = 'SELECT_CITY_VIEW_UNIT_TAB';


export type ClientCloseAttackViewAction = ClientBaseAction<typeof CLOSE_ATTACK_VIEW, void>;
export type ClientCloseCityViewAction = ClientBaseAction<typeof CLOSE_CITY_VIEW, void>;
export type ClientOpenAttackViewAction = ClientBaseAction<typeof OPEN_ATTACK_VIEW, $ReadOnly<{ cityId: string, }>>;
export type ClientOpenCityViewAction = ClientBaseAction<typeof OPEN_CITY_VIEW, $ReadOnly<{ cityId: string, }>>;
export type ClientSelectAttackViewAttackingCityAction = ClientBaseAction<typeof SELECT_ATTACK_VIEW_ATTACKING_CITY_TAB, $ReadOnly<{ cityId: string, }>>;
export type ClientSelectCityViewTabAction = ClientBaseAction<typeof SELECT_CITY_VIEW_TAB, $ReadOnly<{ tab: ClientStateCityViewTab, }>>;
export type ClientSelectCityViewUnitTabAction = ClientBaseAction<typeof SELECT_CITY_VIEW_UNIT_TAB, $ReadOnly<{ unitType: $Keys<CommonStateUnits>, }>>;


export const closeAttackView: ClientActionCreator<ClientCloseAttackViewAction> = () => {
    return {
        type: CLOSE_ATTACK_VIEW, payload: undefined,
    };
};

export const closeCityView: ClientActionCreator<ClientCloseCityViewAction> = () => {
    return {
        type: CLOSE_CITY_VIEW, payload: undefined,
    };
};

export const openAttackView: ClientActionCreator<ClientOpenAttackViewAction> = (payload) => {
    return {
        type: OPEN_ATTACK_VIEW,
        payload,
    };
};

export const openCityView: ClientActionCreator<ClientOpenCityViewAction> = (payload) => {
    return {
        type: OPEN_CITY_VIEW,
        payload,
    };
};

export const selectCityViewTab: ClientActionCreator<ClientSelectCityViewTabAction> = (payload) => {
    return {
        type: SELECT_CITY_VIEW_TAB,
        payload,
    };
};

export const selectCityViewUnitTab: ClientActionCreator<ClientSelectCityViewUnitTabAction> = (payload) => {
    return {
        type: SELECT_CITY_VIEW_UNIT_TAB,
        payload,
    };
};

export const selectAttackViewAttackingCity: ClientActionCreator<ClientSelectAttackViewAttackingCityAction> = (payload) => {
    return {
        type: SELECT_ATTACK_VIEW_ATTACKING_CITY_TAB,
        payload,
    };
};