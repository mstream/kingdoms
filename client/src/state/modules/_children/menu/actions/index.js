// @flow

import type { ClientActionCreator } from '../../../../types';
import type {
    ClientCloseAttackViewAction,
    ClientCloseCityViewAction,
    ClientOpenAttackViewAction,
    ClientOpenCityViewAction,
    ClientSelectAttackViewAttackingCityAction,
    ClientSelectCityViewBuildingsTabAction,
    ClientSelectCityViewOrdersTabAction,
    ClientSelectCityViewResourceTabAction,
    ClientSelectCityViewTabAction,
    ClientSelectCityViewUnitsTabAction,
    ClientUpdateAttackViewMinimumDelayAction,
    ClientUpdateAttackViewRegimentTemplateAction,
} from './types';
import {
    CLOSE_ATTACK_VIEW,
    CLOSE_CITY_VIEW,
    OPEN_ATTACK_VIEW,
    OPEN_CITY_VIEW,
    SELECT_ATTACK_VIEW_ATTACKING_CITY,
    SELECT_CITY_VIEW_BUILDINGS_TAB,
    SELECT_CITY_VIEW_ORDERS_TAB,
    SELECT_CITY_VIEW_RESOURCES_TAB,
    SELECT_CITY_VIEW_TAB,
    SELECT_CITY_VIEW_UNITS_TAB,
    UPDATE_ATTACK_VIEW_MINIMUM_DELAY,
    UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
} from './types';

const closeAttackView: ClientActionCreator<ClientCloseAttackViewAction> = () => {
    return {
        type: CLOSE_ATTACK_VIEW,
        payload: undefined,
    };
};

const closeCityView: ClientActionCreator<ClientCloseCityViewAction> = () => {
    return {
        type: CLOSE_CITY_VIEW,
        payload: undefined,
    };
};

const openAttackView: ClientActionCreator<ClientOpenAttackViewAction> = (
    payload,
) => {
    return {
        type: OPEN_ATTACK_VIEW,
        payload,
    };
};

const openCityView: ClientActionCreator<ClientOpenCityViewAction> = (
    payload,
) => {
    return {
        type: OPEN_CITY_VIEW,
        payload,
    };
};

const selectCityViewTab: ClientActionCreator<ClientSelectCityViewTabAction> = (
    payload,
) => {
    return {
        type: SELECT_CITY_VIEW_TAB,
        payload,
    };
};

const selectCityViewBuildingsTab: ClientActionCreator<ClientSelectCityViewBuildingsTabAction> = (
    payload,
) => {
    return {
        type: SELECT_CITY_VIEW_BUILDINGS_TAB,
        payload,
    };
};

const selectCityViewOrdersTab: ClientActionCreator<ClientSelectCityViewOrdersTabAction> = (
    payload,
) => {
    return {
        type: SELECT_CITY_VIEW_ORDERS_TAB,
        payload,
    };
};

const selectCityViewResourcesTab: ClientActionCreator<ClientSelectCityViewResourceTabAction> = (
    payload,
) => {
    return {
        type: SELECT_CITY_VIEW_RESOURCES_TAB,
        payload,
    };
};

const selectCityViewUnitsTab: ClientActionCreator<ClientSelectCityViewUnitsTabAction> = (
    payload,
) => {
    return {
        type: SELECT_CITY_VIEW_UNITS_TAB,
        payload,
    };
};

const selectAttackViewAttackingCity: ClientActionCreator<ClientSelectAttackViewAttackingCityAction> = (
    payload,
) => {
    return {
        type: SELECT_ATTACK_VIEW_ATTACKING_CITY,
        payload,
    };
};

const updateAttackViewRegimentTemplate: ClientActionCreator<ClientUpdateAttackViewRegimentTemplateAction> = (
    payload,
) => {
    return {
        type: UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
        payload,
    };
};

const updateAttackViewMinimumDelay: ClientActionCreator<ClientUpdateAttackViewMinimumDelayAction> = (
    payload,
) => {
    return {
        type: UPDATE_ATTACK_VIEW_MINIMUM_DELAY,
        payload,
    };
};

export const menuActions = {
    closeAttackView,
    closeCityView,
    openAttackView,
    openCityView,
    selectAttackViewAttackingCity,
    selectCityViewBuildingsTab,
    selectCityViewOrdersTab,
    selectCityViewResourcesTab,
    selectCityViewTab,
    selectCityViewUnitsTab,
    updateAttackViewMinimumDelay,
    updateAttackViewRegimentTemplate,
};
