// @flow

import { zeroVector } from '../../../../vector';
import {
    emptyBuildingsState,
    emptyResourcesState,
    emptyUnitsState,
} from '../../rules/reducer/state';
import type { CommonStateCities, CommonStateCity } from './types';


export const emptyCityState: CommonStateCity = {
    buildings: emptyBuildingsState,
    location: zeroVector,
    name: '',
    ownerId: null,
    resources: emptyResourcesState,
    units: emptyUnitsState,
};

export const emptyCitiesState: CommonStateCities = Object.freeze({});
