// @flow

import {
    BUILDING_WAREHOUSE,
    RESOURCE_FOOD,
    UNIT_PEASANT,
} from '../../../../../../../common/src/state/modules/rules/reducer/types';
import type {
    ClientStateMenu,
} from './types';
import {
    TAB_OVERVIEW,
} from './types';
import {
    emptyRegimentTemplateState,
} from '../../../../../../../common/src/state/modules/orders/reducer/state';

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
