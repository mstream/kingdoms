// @flow

import { zeroVector } from '../../../../vector';
import {
    emptyBuildingsState,
    emptyResourcesState,
    emptyUnitsState,
} from '../../rules/reducer/state';
import type {
    CommonStateCities,
    CommonStateCity,
    CommonStateOrder,
    CommonStateOrders,
} from './types';


export const emptyOrderState: CommonStateOrder = Object.freeze({});

export const emptyOrdersState: CommonStateOrders = Object.freeze({});

export const emptyCityState: CommonStateCity = {
    buildings: emptyBuildingsState,
    location: zeroVector,
    name: '',
    orders: emptyOrdersState,
    ownerId: null,
    resources: emptyResourcesState,
    units: emptyUnitsState,
};

export const emptyCitiesState: CommonStateCities = Object.freeze({});
