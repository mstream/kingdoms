// @flow

import type {
    CommonStateBuildings,
    CommonStateResources,
    CommonStateUnits,
} from '../../rules/reducer/types';
import type {
    Vector,
} from '../../../../vector';

export type CommonStateCity = $ReadOnly< {
    buildings: CommonStateBuildings,
    location: Vector,
    name: string,
    ownerId: ?string,
    resources: CommonStateResources,
    units: CommonStateUnits,
} >;

export type CommonStateCities = $ReadOnly< { [string]: CommonStateCity } >;
