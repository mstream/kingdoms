// @flow

import type {
    ClientCloseAttackViewAction,
} from './_children/close-attack-view/types';
import type {
    ClientCloseCityViewAction,
} from './_children/close-city-view/types';
import type {
    ClientOpenAttackViewAction,
} from './_children/open-attack-view/types';
import type {
    ClientOpenCityViewAction,
} from './_children/open-city-view/types';
import type {
    ClientSelectAttackViewAttackingCityAction,
} from './_children/select-attack-view-attacking-city/types';
import type {
    ClientSelectCityViewBuildingsTabAction,
} from './_children/select-city-view-buildings-tab/types';
import type {
    ClientSelectCityViewOrdersTabAction,
} from './_children/select-city-view-orders-tab/types';
import type {
    ClientSelectCityViewResourcesTabAction,
} from './_children/select-city-view-resources-tab/types';
import type {
    ClientSelectCityViewTabAction,
} from './_children/select-city-view-tab/types';
import type {
    ClientSelectCityViewUnitsTabAction,
} from './_children/select-city-view-units-tab/types';
import type {
    ClientUpdateAttackViewMinimumDelayAction,
} from './_children/update-attack-view-minimum-delay/types';
import type {
    ClientUpdateAttackViewRegimentTemplateAction,
} from './_children/update-attack-view-regiment-template/types';

export type {
    ClientCloseAttackViewAction,
} from './_children/close-attack-view/types';
export type {
    ClientCloseCityViewAction,
} from './_children/close-city-view/types';
export type {
    ClientOpenAttackViewAction,
} from './_children/open-attack-view/types';
export type {
    ClientOpenCityViewAction,
} from './_children/open-city-view/types';
export type {
    ClientSelectAttackViewAttackingCityAction,
} from './_children/select-attack-view-attacking-city/types';
export type {
    ClientSelectCityViewBuildingsTabAction,
} from './_children/select-city-view-buildings-tab/types';
export type {
    ClientSelectCityViewOrdersTabAction,
} from './_children/select-city-view-orders-tab/types';
export type {
    ClientSelectCityViewResourcesTabAction,
} from './_children/select-city-view-resources-tab/types';
export type {
    ClientSelectCityViewTabAction,
} from './_children/select-city-view-tab/types';
export type {
    ClientSelectCityViewUnitsTabAction,
} from './_children/select-city-view-units-tab/types';
export type {
    ClientUpdateAttackViewMinimumDelayAction,
} from './_children/update-attack-view-minimum-delay/types';
export type {
    ClientUpdateAttackViewRegimentTemplateAction,
} from './_children/update-attack-view-regiment-template/types';

export {
    CLOSE_ATTACK_VIEW,
} from './_children/close-attack-view/types';
export {
    CLOSE_CITY_VIEW,
} from './_children/close-city-view/types';
export {
    OPEN_ATTACK_VIEW,
} from './_children/open-attack-view/types';
export {
    OPEN_CITY_VIEW,
} from './_children/open-city-view/types';
export {
    SELECT_ATTACK_VIEW_ATTACKING_CITY,
} from './_children/select-attack-view-attacking-city/types';
export {
    SELECT_CITY_VIEW_BUILDINGS_TAB,
} from './_children/select-city-view-buildings-tab/types';
export {
    SELECT_CITY_VIEW_ORDERS_TAB,
} from './_children/select-city-view-orders-tab/types';
export {
    SELECT_CITY_VIEW_RESOURCES_TAB,
} from './_children/select-city-view-resources-tab/types';
export {
    SELECT_CITY_VIEW_TAB,
} from './_children/select-city-view-tab/types';
export {
    SELECT_CITY_VIEW_UNITS_TAB,
} from './_children/select-city-view-units-tab/types';
export {
    UPDATE_ATTACK_VIEW_MINIMUM_DELAY,
} from './_children/update-attack-view-minimum-delay/types';
export {
    UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
} from './_children/update-attack-view-regiment-template/types';


export type MenuAction =
    |  ClientCloseAttackViewAction
    |  ClientCloseCityViewAction
    |  ClientOpenAttackViewAction
    |  ClientOpenCityViewAction
    |  ClientSelectAttackViewAttackingCityAction
    |  ClientSelectCityViewBuildingsTabAction
    |  ClientSelectCityViewOrdersTabAction
    |  ClientSelectCityViewResourcesTabAction
    |  ClientSelectCityViewTabAction
    |  ClientSelectCityViewUnitsTabAction
    |  ClientUpdateAttackViewMinimumDelayAction
    |  ClientUpdateAttackViewRegimentTemplateAction
