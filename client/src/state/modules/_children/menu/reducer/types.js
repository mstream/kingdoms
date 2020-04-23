// @flow

import type {
    CommonStateBuildingKey,
    CommonStateResourceKey,
    CommonStateUnitKey,
} from '../../../../../../../common/src/state/modules/_children/rules/reducer/types';
import type {
    CommonStateRegimentTemplate,
} from '../../../../../../../common/src/state/modules/_children/orders/reducer/types';

export const TAB_BUILDINGS: 'TAB_BUILDINGS' = `TAB_BUILDINGS`;
export const TAB_ORDERS: 'TAB_ORDERS' = `TAB_ORDERS`;
export const TAB_OVERVIEW: 'TAB_OVERVIEW' = `TAB_OVERVIEW`;
export const TAB_RESOURCES: 'TAB_RESOURCES' = `TAB_RESOURCES`;
export const TAB_UNITS: 'TAB_UNITS' = `TAB_UNITS`;

export type ClientStateCityViewTab =
    | typeof TAB_BUILDINGS
    | typeof TAB_ORDERS
    | typeof TAB_OVERVIEW
    | typeof TAB_RESOURCES
    | typeof TAB_UNITS;

export type ClientStateAttackView = $ReadOnly< {
    attackedCityId: ?string,
    attackingCityId: ?string,
    isSubmitting: boolean,
    minimumDelay: number,
    regimentTemplate: CommonStateRegimentTemplate,
} >;

export type ClientStateCityView = $ReadOnly< {
    building: CommonStateBuildingKey,
    currentCityId: ?string,
    orderId: ?string,
    resource: CommonStateResourceKey,
    tab: ClientStateCityViewTab,
    unit: CommonStateUnitKey,
} >;

export type ClientStateNewCity = $ReadOnly< {
    isCityBeingCreated: boolean,
} >;

export type ClientStateMenu = $ReadOnly< {
    attackView: ClientStateAttackView,
    cityView: ClientStateCityView,
    newCity: ClientStateNewCity,
} >;
