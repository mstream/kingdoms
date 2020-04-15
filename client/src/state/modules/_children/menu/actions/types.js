// @flow

import type {
    BaseAction,
} from '../../../../../../../common/src/types/actions';
import type {
    ClientStateCityViewTab,
} from '../reducer/types';
import type {
    CommonStateBuildingKey,
    CommonStateResourceKey,
    CommonStateUnitKey,
} from '../../../../../../../common/src/state/modules/rules/reducer/types';
import type {
    CommonStateRegimentTemplate,
} from '../../../../../../../common/src/state/modules/orders/reducer/types';

export const CLOSE_ATTACK_VIEW: 'CLOSE_ATTACK_VIEW' = `CLOSE_ATTACK_VIEW`;
export const CLOSE_CITY_VIEW: 'CLOSE_CITY_VIEW' = `CLOSE_CITY_VIEW`;
export const OPEN_ATTACK_VIEW: 'OPEN_ATTACK_VIEW' = `OPEN_ATTACK_VIEW`;
export const OPEN_CITY_VIEW: 'OPEN_CITY_VIEW' = `OPEN_CITY_VIEW`;
export const SELECT_ATTACK_VIEW_ATTACKING_CITY: 'SELECT_ATTACK_VIEW_ATTACKING_CITY'
    = `SELECT_ATTACK_VIEW_ATTACKING_CITY`;
export const SELECT_CITY_VIEW_TAB: 'SELECT_CITY_VIEW_TAB'
    = `SELECT_CITY_VIEW_TAB`;
export const SELECT_CITY_VIEW_BUILDINGS_TAB: 'SELECT_CITY_VIEW_BUILDINGS_TAB'
    = `SELECT_CITY_VIEW_BUILDINGS_TAB`;
export const SELECT_CITY_VIEW_ORDERS_TAB: 'SELECT_CITY_VIEW_ORDERS_TAB'
    = `SELECT_CITY_VIEW_ORDERS_TAB`;
export const SELECT_CITY_VIEW_RESOURCES_TAB: 'SELECT_CITY_VIEW_RESOURCES_TAB'
    = `SELECT_CITY_VIEW_RESOURCES_TAB`;
export const SELECT_CITY_VIEW_UNITS_TAB: 'SELECT_CITY_VIEW_UNITS_TAB'
    = `SELECT_CITY_VIEW_UNITS_TAB`;
export const UPDATE_ATTACK_VIEW_MINIMUM_DELAY: 'UPDATE_ATTACK_VIEW_MINIMUM_DELAY'
    = `UPDATE_ATTACK_VIEW_MINIMUM_DELAY`;
export const UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE: 'UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE'
    = `UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE`;

export type ClientCloseAttackViewAction = BaseAction< typeof CLOSE_ATTACK_VIEW,
    void, >;
export type ClientCloseCityViewAction = BaseAction< typeof CLOSE_CITY_VIEW,
    void, >;
export type ClientOpenAttackViewAction = BaseAction< typeof OPEN_ATTACK_VIEW,
    $ReadOnly< { cityId: string } >, >;
export type ClientOpenCityViewAction = BaseAction< typeof OPEN_CITY_VIEW,
    $ReadOnly< { cityId: string } >, >;

export type ClientSelectAttackViewAttackingCityAction = BaseAction< typeof SELECT_ATTACK_VIEW_ATTACKING_CITY,
    $ReadOnly< { cityId: string } >, >;
export type ClientSelectCityViewTabAction = BaseAction< typeof SELECT_CITY_VIEW_TAB,
    $ReadOnly< { tab: ClientStateCityViewTab } >, >;
export type ClientSelectCityViewBuildingsTabAction = BaseAction< typeof SELECT_CITY_VIEW_BUILDINGS_TAB,
    $ReadOnly< { buildingType: CommonStateBuildingKey } >, >;
export type ClientSelectCityViewOrdersTabAction = BaseAction< typeof SELECT_CITY_VIEW_ORDERS_TAB,
    $ReadOnly< { orderId: string } >, >;
export type ClientSelectCityViewResourceTabAction = BaseAction< typeof SELECT_CITY_VIEW_RESOURCES_TAB,
    $ReadOnly< { resourceType: CommonStateResourceKey } >, >;
export type ClientSelectCityViewUnitsTabAction = BaseAction< typeof SELECT_CITY_VIEW_UNITS_TAB,
    $ReadOnly< { unitType: CommonStateUnitKey } >, >;
export type ClientUpdateAttackViewMinimumDelayAction = BaseAction< typeof UPDATE_ATTACK_VIEW_MINIMUM_DELAY,
    $ReadOnly< { minimumDelay: number } >, >;
export type ClientUpdateAttackViewRegimentTemplateAction = BaseAction< typeof UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
    $ReadOnly< { regimentTemplate: CommonStateRegimentTemplate } >, >;
