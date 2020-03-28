// @flow

import type { BaseAction } from '../../../../../../../common/src/types/actions';
import type { CommonStateBuildingKey } from '../../../../../../../common/src/state/modules/rules/reducer/types';
import type { CommonState } from '../../../../../../../common/src/state/modules/types';
import type { CommonStateRegimentTemplate } from '../../../../../../../common/src/state/modules/orders/reducer/types';

export const REQUEST_BUILDING_UPGRADE: 'REQUEST_BUILDING_UPGRADE' = 'REQUEST_BUILDING_UPGRADE';
export const REQUEST_CITY_CREATION: 'REQUEST_CITY_CREATION' = 'REQUEST_CITY_CREATION';
export const REQUEST_CITY_NAME_CHANGE: 'REQUEST_CITY_NAME_CHANGE' = 'REQUEST_CITY_NAME_CHANGE';
export const REQUEST_ORDER_CREATION: 'REQUEST_ORDER_CREATION' = 'REQUEST_ORDER_CREATION';
export const UPDATE_STATE: 'UPDATE_STATE' = 'UPDATE_STATE';

export type ClientUpdateStateAction = BaseAction<typeof UPDATE_STATE, $ReadOnly<{ commonState: CommonState }>>;
export type ClientRequestBuildingUpgradeAction = BaseAction<typeof REQUEST_BUILDING_UPGRADE, $ReadOnly<{ cityId: string, buildingType: CommonStateBuildingKey, }>>
export type ClientRequestCityCreationAction = BaseAction<typeof REQUEST_CITY_CREATION, $ReadOnly<{ name: string, }>>
export type ClientRequestCityNameChangeAction = BaseAction<typeof REQUEST_CITY_NAME_CHANGE, $ReadOnly<{ cityId: string, name: string, }>>

export type ClientRequestOrderCreationAction = BaseAction<typeof REQUEST_ORDER_CREATION, $ReadOnly<{
    minimumDelay: number,
    originCityId: string,
    regimentTemplate: CommonStateRegimentTemplate,
    targetCityId: string,
}>>;
