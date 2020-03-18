// @flow

import type { CommonStateBuildingKey } from '../../rules/reducer/types';
import type { BaseAction } from '../../../actions/types';

export const ABANDON_CITY: 'ABANDON_CITY' = 'ABANDON_CITY';
export const CHANGE_CITY_NAME: 'CHANGE_CITY_NAME' = 'CHANGE_CITY_NAME';
export const CREATE_CITY: 'CREATE_CITY' = 'CREATE_CITY';
export const CREATE_ORDER: 'CREATE_ORDER' = 'CREATE_ORDER';
export const UPGRADE_BUILDING: 'UPGRADE_BUILDING' = 'UPGRADE_BUILDING';

export type CommonAbandonCityAction = BaseAction<typeof ABANDON_CITY, $ReadOnly<{ cityId: string, playerId: string, }>>;
export type CommonChangeCityNameAction = BaseAction<typeof CHANGE_CITY_NAME, $ReadOnly<{ cityId: string, name: string, playerId: string, }>>;
export type CommonCreateCityAction = BaseAction<typeof CREATE_CITY, $ReadOnly<{ cityId: string, name: string, playerId: string, }>>;
export type CommonCreateOrderAction = BaseAction<typeof CREATE_ORDER, $ReadOnly<{ originCityId: string, regimentTemplate: string, targetCityId: string, }>>;
export type CommonUpgradeBuildingAction = BaseAction<typeof UPGRADE_BUILDING, $ReadOnly<{ buildingType: CommonStateBuildingKey, cityId: string, playerId: string, }>>;
