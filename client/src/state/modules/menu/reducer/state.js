// @flow

import {
    BUILDING_WAREHOUSE,
    RESOURCE_FOOD,
    UNIT_PEASANT,
} from '../../../../../../common/src/state/modules/rules/reducer/types';
import type { ClientStateMenu } from './types';
import { TAB_OVERVIEW } from './types';

export const emptyMenuState: ClientStateMenu = {
    attackView: {
        attackedCityId: null,
        attackingCityId: null,
        regimentTemplate: {},
    },
    cityView: {
        building: BUILDING_WAREHOUSE,
        currentCityId: null,
        resource: RESOURCE_FOOD,
        tab: TAB_OVERVIEW,
        unit: UNIT_PEASANT,
    },
    newCity: {
        isCityBeingCreated: false,
    },
};

export const initialMenuState = {
    attackView: {
        attackedCityId: null,
        attackingCityId: null,
        regimentTemplate: {},
    },
    cityView: {
        building: BUILDING_WAREHOUSE,
        currentCityId: null,
        resource: RESOURCE_FOOD,
        tab: TAB_OVERVIEW,
        unit: UNIT_PEASANT,
    },
    newCity: {
        isCityBeingCreated: false,
    },
};