// @flow

import type {
    CommonStateBuildings,
    CommonStateResources,
    CommonStateUnits,
} from '../../rules/reducer/types';
import type { Vector } from '../../../../vector';

export type CommonStateOrder = $ReadOnly<{}>;

export type CommonStateOrders = $ReadOnly<{ [string]: CommonStateOrder, ... }>;

export type CommonStateCity = $ReadOnly<{
    buildings: CommonStateBuildings,
    location: Vector,
    name: string,
    orders: CommonStateOrders,
    ownerId: ?string,
    resources: CommonStateResources,
    units: CommonStateUnits,
}>;

export type CommonStateCities = $ReadOnly<{ [string]: CommonStateCity, ... }>;

