// @flow

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
import type {
    ClientActionCreator,
} from '../../../../types';
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

const closeAttackView: ClientActionCreator< ClientCloseAttackViewAction > = () => {

    return {
        payload: undefined,
        type   : CLOSE_ATTACK_VIEW,
    };

};

const closeCityView: ClientActionCreator< ClientCloseCityViewAction > = () => {

    return {
        payload: undefined,
        type   : CLOSE_CITY_VIEW,
    };

};

const openAttackView: ClientActionCreator< ClientOpenAttackViewAction > = (
    payload,
) => {

    return {
        payload,
        type: OPEN_ATTACK_VIEW,
    };

};

const openCityView: ClientActionCreator< ClientOpenCityViewAction > = (
    payload,
) => {

    return {
        payload,
        type: OPEN_CITY_VIEW,
    };

};

const selectCityViewTab: ClientActionCreator< ClientSelectCityViewTabAction > = (
    payload,
) => {

    return {
        payload,
        type: SELECT_CITY_VIEW_TAB,
    };

};

const selectCityViewBuildingsTab: ClientActionCreator< ClientSelectCityViewBuildingsTabAction > = (
    payload,
) => {

    return {
        payload,
        type: SELECT_CITY_VIEW_BUILDINGS_TAB,
    };

};

const selectCityViewOrdersTab: ClientActionCreator< ClientSelectCityViewOrdersTabAction > = (
    payload,
) => {

    return {
        payload,
        type: SELECT_CITY_VIEW_ORDERS_TAB,
    };

};

const selectCityViewResourcesTab: ClientActionCreator< ClientSelectCityViewResourceTabAction > = (
    payload,
) => {

    return {
        payload,
        type: SELECT_CITY_VIEW_RESOURCES_TAB,
    };

};

const selectCityViewUnitsTab: ClientActionCreator< ClientSelectCityViewUnitsTabAction > = (
    payload,
) => {

    return {
        payload,
        type: SELECT_CITY_VIEW_UNITS_TAB,
    };

};

const selectAttackViewAttackingCity: ClientActionCreator< ClientSelectAttackViewAttackingCityAction > = (
    payload,
) => {

    return {
        payload,
        type: SELECT_ATTACK_VIEW_ATTACKING_CITY,
    };

};

const updateAttackViewRegimentTemplate: ClientActionCreator< ClientUpdateAttackViewRegimentTemplateAction > = (
    payload,
) => {

    return {
        payload,
        type: UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
    };

};

const updateAttackViewMinimumDelay: ClientActionCreator< ClientUpdateAttackViewMinimumDelayAction > = (
    payload,
) => {

    return {
        payload,
        type: UPDATE_ATTACK_VIEW_MINIMUM_DELAY,
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
