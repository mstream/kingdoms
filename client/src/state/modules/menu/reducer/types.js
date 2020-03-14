// @flow

import type { ClientAction } from '../../../actions';
import type {
    CommonStateUnits,
    RegimentTemplate,
} from '../../../../../../common/src/state';
import { UNIT_PEASANT } from '../../../../../../common/src/state';
import type { ClientStateReducerTestScenario } from '../../types';

export const TAB_OVERVIEW: 'TAB_OVERVIEW' = 'TAB_OVERVIEW';
export const TAB_UNITS: 'TAB_UNITS' = 'TAB_UNITS';
export const TAB_RESOURCES: 'TAB_RESOURCES' = 'TAB_RESOURCES';
export const TAB_BUILDINGS: 'TAB_BUILDINGS' = 'TAB_BUILDINGS';
export type ClientStateCityViewTab =
    | typeof TAB_BUILDINGS
    | typeof TAB_OVERVIEW
    | typeof TAB_RESOURCES
    | typeof TAB_UNITS;

export type ClientStateMenuReducerTestScenario<A: ClientAction> = ClientStateReducerTestScenario<ClientStateMenu, A>;

export type ClientStateAttackView = $ReadOnly<{
    attackedCityId: ?string,
    attackingCityId: ?string,
    regimentTemplate: RegimentTemplate,
}>;

export type ClientStateCityView = $ReadOnly<{
    currentCityId: ?string,
    tab: ClientStateCityViewTab,
    unit: $Keys<CommonStateUnits>,
}>;

export type ClientStateNewCity = $ReadOnly<{
    isCityBeingCreated: boolean,
}>;

export type ClientStateMenu = $ReadOnly<{
    attackView: ClientStateAttackView,
    cityView: ClientStateCityView,
    newCity: ClientStateNewCity,
}>;

export const emptyMenuState: ClientStateMenu = {
    attackView: {
        attackedCityId: null,
        attackingCityId: null,
        regimentTemplate: {},
    },
    cityView: {
        currentCityId: null,
        tab: TAB_OVERVIEW,
        unit: UNIT_PEASANT,
    },
    newCity: {
        isCityBeingCreated: false,
    },
};

