// @flow

import type { ClientAction } from '../../../actions';
import { unsupportedActionReducer } from '../../unsupported-action-reducer';
import { updateStateMenuReducer } from './update-state';
import { closeCityViewMenuReducer } from './close-city-view';
import { openCityViewMenuReducer } from './open-city-view';
import { requestCityCreationMenuReducer } from './request-city-creation';
import { selectCityViewTabMenuReducer } from './select-city-view-tab';
import { selectCityViewUnitTabMenuReducer } from './select-city-view-unit-tab';
import { closeAttackViewMenuReducer } from './close-attack-view';
import { openAttackViewMenuReducer } from './open-attack-view';
import type { ClientStateMenu } from './types';
import { TAB_OVERVIEW } from './types';
import {
    BUILDING_WAREHOUSE,
    RESOURCE_FOOD,
    UNIT_PEASANT,
} from '../../../../../../common/src/state';
import type { ClientState } from '../../root';
import {
    CLOSE_ATTACK_VIEW,
    CLOSE_CITY_VIEW,
    OPEN_ATTACK_VIEW,
    OPEN_CITY_VIEW,
    SELECT_ATTACK_VIEW_ATTACKING_CITY_TAB,
    SELECT_CITY_VIEW_BUILDINGS_TAB,
    SELECT_CITY_VIEW_RESOURCES_TAB,
    SELECT_CITY_VIEW_TAB,
    SELECT_CITY_VIEW_UNITS_TAB,
    selectCityViewResourcesTab,
} from '../actions';
import {
    REQUEST_CITY_CREATION,
    UPDATE_STATE,
} from '../../common-state/actions';
import { selectAttackViewAttackingCityReducer } from './select-attack-view-attacking-city';
import { selectCityViewResourcesTabMenuReducer } from './select-city-view-resources-tab';
import { selectCityViewBuildingsTabMenuReducer } from './select-city-view-buildings-tab';

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

export const menuReducer = (
    localState: ClientStateMenu = initialMenuState,
    action: ClientAction,
    globalState: ClientState,
): ClientStateMenu => {
    switch (action.type) {
        case CLOSE_ATTACK_VIEW: {
            return closeAttackViewMenuReducer({
                action,
                localState,
                globalState,
            });
        }
        case CLOSE_CITY_VIEW: {
            return closeCityViewMenuReducer({
                action,
                localState,
                globalState,
            });
        }
        case OPEN_ATTACK_VIEW: {
            return openAttackViewMenuReducer({
                action,
                localState,
                globalState,
            });
        }
        case OPEN_CITY_VIEW: {
            return openCityViewMenuReducer({
                action,
                localState,
                globalState,
            });
        }
        case REQUEST_CITY_CREATION: {
            return requestCityCreationMenuReducer({
                action,
                localState,
                globalState,
            });
        }
        case SELECT_ATTACK_VIEW_ATTACKING_CITY_TAB: {
            return selectAttackViewAttackingCityReducer({
                action,
                localState,
                globalState,
            });
        }
        case SELECT_CITY_VIEW_TAB: {
            return selectCityViewTabMenuReducer({
                action,
                localState,
                globalState,
            });
        }
        case SELECT_CITY_VIEW_BUILDINGS_TAB: {
            return selectCityViewBuildingsTabMenuReducer({
                action,
                localState,
                globalState,
            });
        }
        case SELECT_CITY_VIEW_RESOURCES_TAB: {
            return selectCityViewResourcesTabMenuReducer({
                action,
                localState,
                globalState,
            });
        }
        case SELECT_CITY_VIEW_UNITS_TAB: {
            return selectCityViewUnitTabMenuReducer({
                action,
                localState,
                globalState,
            });
        }
        case UPDATE_STATE: {
            return updateStateMenuReducer({ action, localState, globalState });
        }
        default: {
            return unsupportedActionReducer({
                action,
                localState,
                globalState,
            });
        }
    }
};
