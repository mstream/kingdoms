// @flow

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
import { selectAttackViewAttackingCityReducer } from './select-attack-view-attacking-city';
import { selectCityViewResourcesTabMenuReducer } from './select-city-view-resources-tab';
import { selectCityViewBuildingsTabMenuReducer } from './select-city-view-buildings-tab';
import type { ClientState } from '../../types';
import type { ClientAction } from '../../../types';
import {
    REQUEST_CITY_CREATION,
    UPDATE_STATE,
} from '../../common-state/actions/types';
import {
    CLOSE_ATTACK_VIEW,
    CLOSE_CITY_VIEW,
    OPEN_ATTACK_VIEW,
    OPEN_CITY_VIEW,
    SELECT_ATTACK_VIEW_ATTACKING_CITY_TAB,
    SELECT_CITY_VIEW_BUILDINGS_TAB,
    SELECT_CITY_VIEW_RESOURCES_TAB,
    SELECT_CITY_VIEW_TAB,
    SELECT_CITY_VIEW_UNITS_TAB, UPDATE_ATTACK_VIEW_MINIMUM_DELAY,
    UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
} from '../actions/types';
import { initialMenuState } from './state';
import { updateAttackViewRegimentTemplateReducer } from './update-attack-view-regiment-template';
import { updateAttackViewMinimumDelayReducer } from './update-attack-view-minimum-delay-template';

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
        case UPDATE_ATTACK_VIEW_MINIMUM_DELAY: {
            return updateAttackViewMinimumDelayReducer({
                action,
                localState,
                globalState,
            });
        }
        case UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE: {
            return updateAttackViewRegimentTemplateReducer({
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
