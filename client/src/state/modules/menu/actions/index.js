// @flow

import type { ClientStateCityViewTab } from '../reducer/types';
import type { ClientActionCreator } from '../../../actions/types';
import type {
    CommonStateBuildingKey,
    CommonStateUnitKey, CommonStateResourceKey,
} from '../../../../../../common/src/state/modules/rules/reducer/types';
import type { BaseAction } from '../../../../../../common/src/types/actions';

export const CLOSE_ATTACK_VIEW: 'CLOSE_ATTACK_VIEW' = 'CLOSE_ATTACK_VIEW';
export const CLOSE_CITY_VIEW: 'CLOSE_CITY_VIEW' = 'CLOSE_CITY_VIEW';
export const OPEN_ATTACK_VIEW: 'OPEN_ATTACK_VIEW' = 'OPEN_ATTACK_VIEW';
export const OPEN_CITY_VIEW: 'OPEN_CITY_VIEW' = 'OPEN_CITY_VIEW';
export const SELECT_ATTACK_VIEW_ATTACKING_CITY_TAB: 'SELECT_ATTACK_VIEW_ATTACKING_CITY_TAB' = 'SELECT_ATTACK_VIEW_ATTACKING_CITY_TAB';
export const SELECT_CITY_VIEW_TAB: 'SELECT_CITY_VIEW_TAB' = 'SELECT_CITY_VIEW_TAB';
export const SELECT_CITY_VIEW_BUILDINGS_TAB: 'SELECT_CITY_VIEW_BUILDINGS_TAB' = 'SELECT_CITY_VIEW_BUILDINGS_TAB';
export const SELECT_CITY_VIEW_RESOURCES_TAB: 'SELECT_CITY_VIEW_RESOURCES_TAB' = 'SELECT_CITY_VIEW_RESOURCES_TAB';
export const SELECT_CITY_VIEW_UNITS_TAB: 'SELECT_CITY_VIEW_UNITS_TAB' = 'SELECT_CITY_VIEW_UNITS_TAB';


export type ClientCloseAttackViewAction = BaseAction<typeof CLOSE_ATTACK_VIEW, void>;
export type ClientCloseCityViewAction = BaseAction<typeof CLOSE_CITY_VIEW, void>;
export type ClientOpenAttackViewAction = BaseAction<typeof OPEN_ATTACK_VIEW, $ReadOnly<{ cityId: string, }>>;
export type ClientOpenCityViewAction = BaseAction<typeof OPEN_CITY_VIEW, $ReadOnly<{ cityId: string, }>>;
export type ClientSelectAttackViewAttackingCityAction = BaseAction<typeof SELECT_ATTACK_VIEW_ATTACKING_CITY_TAB, $ReadOnly<{ cityId: string, }>>;
export type ClientSelectCityViewTabAction = BaseAction<typeof SELECT_CITY_VIEW_TAB, $ReadOnly<{ tab: ClientStateCityViewTab, }>>;
export type ClientSelectCityViewBuildingsTabAction = BaseAction<typeof SELECT_CITY_VIEW_BUILDINGS_TAB, $ReadOnly<{ buildingType: CommonStateBuildingKey, }>>;
export type ClientSelectCityViewResourceTabAction = BaseAction<typeof SELECT_CITY_VIEW_RESOURCES_TAB, $ReadOnly<{ resourceType: CommonStateResourceKey, }>>;
export type ClientSelectCityViewUnitsTabAction = BaseAction<typeof SELECT_CITY_VIEW_UNITS_TAB, $ReadOnly<{ unitType: CommonStateUnitKey, }>>;


export const closeAttackView: ClientActionCreator<ClientCloseAttackViewAction> = () => {
    return {
        type: CLOSE_ATTACK_VIEW,
        payload: undefined,
    };
};

export const closeCityView: ClientActionCreator<ClientCloseCityViewAction> = () => {
    return {
        type: CLOSE_CITY_VIEW,
        payload: undefined,
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

export const selectCityViewBuildingsTab: ClientActionCreator<ClientSelectCityViewBuildingsTabAction> = (payload) => {
    return {
        type: SELECT_CITY_VIEW_BUILDINGS_TAB,
        payload,
    };
};

export const selectCityViewResourcesTab: ClientActionCreator<ClientSelectCityViewResourceTabAction> = (payload) => {
    return {
        type: SELECT_CITY_VIEW_RESOURCES_TAB,
        payload,
    };
};

export const selectCityViewUnitsTab: ClientActionCreator<ClientSelectCityViewUnitsTabAction> = (payload) => {
    return {
        type: SELECT_CITY_VIEW_UNITS_TAB,
        payload,
    };
};


export const selectAttackViewAttackingCity: ClientActionCreator<ClientSelectAttackViewAttackingCityAction> = (payload) => {
    return {
        type: SELECT_ATTACK_VIEW_ATTACKING_CITY_TAB,
        payload,
    };
};