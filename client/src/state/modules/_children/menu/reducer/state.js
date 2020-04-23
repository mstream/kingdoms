// @flow

import {
    BUILDING_WAREHOUSE,
    RESOURCE_FOOD,
    UNIT_PEASANT,
} from '../../../../../../../common/src/state/modules/_children/rules/reducer/types';
import {
    TAB_OVERVIEW,
} from './types';
import {
    emptyRegimentTemplateState,
} from '../../../../../../../common/src/state/modules/_children/orders/reducer/state';
import type {
    ClientStateMenu,
} from './types';

export const emptyMenuState: ClientStateMenu = {
    attackView: {
        attackedCityId  : null,
        attackingCityId : null,
        isSubmitting    : false,
        minimumDelay    : 0,
        regimentTemplate: emptyRegimentTemplateState,
    },
    cityView: {
        building     : BUILDING_WAREHOUSE,
        currentCityId: null,
        orderId      : null,
        resource     : RESOURCE_FOOD,
        tab          : TAB_OVERVIEW,
        unit         : UNIT_PEASANT,
    },
    newCity: {
        isCityBeingCreated: false,
    },
};

export const initialMenuState = {
    attackView: {
        attackedCityId  : null,
        attackingCityId : null,
        isSubmitting    : false,
        minimumDelay    : 0,
        regimentTemplate: emptyRegimentTemplateState,
    },
    cityView: {
        building     : BUILDING_WAREHOUSE,
        currentCityId: null,
        orderId      : null,
        resource     : RESOURCE_FOOD,
        tab          : TAB_OVERVIEW,
        unit         : UNIT_PEASANT,
    },
    newCity: {
        isCityBeingCreated: false,
    },
};
