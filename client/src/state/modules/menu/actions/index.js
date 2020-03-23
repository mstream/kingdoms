// @flow


import type { ClientActionCreator } from '../../../types';
import type {
    ClientCloseAttackViewAction,
    ClientCloseCityViewAction,
    ClientOpenAttackViewAction,
    ClientOpenCityViewAction,
    ClientSelectAttackViewAttackingCityAction,
    ClientSelectCityViewBuildingsTabAction,
    ClientSelectCityViewResourceTabAction,
    ClientSelectCityViewTabAction,
    ClientSelectCityViewUnitsTabAction,
    ClientUpdateAttackViewRegimentTemplateAction,
} from './types';
import {
    CLOSE_ATTACK_VIEW,
    CLOSE_CITY_VIEW,
    OPEN_ATTACK_VIEW,
    OPEN_CITY_VIEW,
    SELECT_ATTACK_VIEW_ATTACKING_CITY_TAB,
    SELECT_CITY_VIEW_BUILDINGS_TAB,
    SELECT_CITY_VIEW_RESOURCES_TAB,
    SELECT_CITY_VIEW_TAB,
    SELECT_CITY_VIEW_UNITS_TAB, UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
} from './types';


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


export const updateAttackViewRegimentTemplate: ClientActionCreator<ClientUpdateAttackViewRegimentTemplateAction> = (payload) => {
    return {
        type: UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
        payload,
    };
};