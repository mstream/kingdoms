// @flow

import type {
    CommonStateBuildings,
    CommonStateResources,
    CommonStateUnits,
} from '../../rules/reducer/types';
import type { Vector } from '../../../../vector';

export type CommonStateOrder = {};

export type CommonStateOrders = { [string]: CommonStateOrder, ... };

export type CommonStateCity = {
    buildings: CommonStateBuildings,
    location: Vector,
    name: string,
    orders: CommonStateOrders,
    ownerId: ?string,
    resources: CommonStateResources,
    units: CommonStateUnits,
};

export type CommonStateCities = { [string]: CommonStateCity, ... };

