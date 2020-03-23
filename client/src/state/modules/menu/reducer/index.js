// @flow

import { updateStateMenuReducer } from './update-state';
import { closeCityViewMenuReducer } from './close-city-view';
import { openCityViewMenuReducer } from './open-city-view';
import { requestCityCreationMenuReducer } from './request-city-creation';
import { selectCityViewUnitTabMenuReducer } from './select-city-view-unit-tab';
import { closeAttackViewMenuReducer } from './close-attack-view';
import { openAttackViewMenuReducer } from './open-attack-view';
import type { ClientStateMenu } from './types';
import { selectAttackViewAttackingCityReducer } from './select-attack-view-attacking-city';
import { selectCityViewResourcesTabMenuReducer } from './select-city-view-resources-tab';
import { selectCityViewBuildingsTabMenuReducer } from './select-city-view-buildings-tab';
import {
    REQUEST_CITY_CREATION,
    UPDATE_STATE,
} from '../../common-state/actions/types';
import {
    CLOSE_ATTACK_VIEW,
    CLOSE_CITY_VIEW,
    OPEN_ATTACK_VIEW,
    OPEN_CITY_VIEW,
    SELECT_ATTACK_VIEW_ATTACKING_CITY,
    SELECT_CITY_VIEW_BUILDINGS_TAB,
    SELECT_CITY_VIEW_RESOURCES_TAB,
    SELECT_CITY_VIEW_TAB,
    SELECT_CITY_VIEW_UNITS_TAB,
    UPDATE_ATTACK_VIEW_MINIMUM_DELAY,
    UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
} from '../actions/types';
import { updateAttackViewRegimentTemplateReducer } from './update-attack-view-regiment-template';
import { updateAttackViewMinimumDelayReducer } from './update-attack-view-minimum-delay-template';
import { createClientStateReducer } from '../../utils';
import { initialClientState } from '../../state';
import { selectCityViewTab } from '../actions';
import { selectCityViewTabMenuReducer } from './select-city-view-tab';


export const menuReducer = createClientStateReducer<ClientStateMenu>({
    actionReducers: {
        [CLOSE_ATTACK_VIEW]: closeAttackViewMenuReducer,
        [CLOSE_CITY_VIEW]: closeCityViewMenuReducer,
        [OPEN_ATTACK_VIEW]: openAttackViewMenuReducer,
        [OPEN_CITY_VIEW]: openCityViewMenuReducer,
        [REQUEST_CITY_CREATION]: requestCityCreationMenuReducer,
        [SELECT_ATTACK_VIEW_ATTACKING_CITY]: selectAttackViewAttackingCityReducer,
        [SELECT_CITY_VIEW_TAB]: selectCityViewTabMenuReducer,
        [SELECT_CITY_VIEW_BUILDINGS_TAB]: selectCityViewBuildingsTabMenuReducer,
        [SELECT_CITY_VIEW_RESOURCES_TAB]: selectCityViewResourcesTabMenuReducer,
        [SELECT_CITY_VIEW_UNITS_TAB]: selectCityViewUnitTabMenuReducer,
        [UPDATE_ATTACK_VIEW_MINIMUM_DELAY]: updateAttackViewMinimumDelayReducer,
        [UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE]: updateAttackViewRegimentTemplateReducer,
        [UPDATE_STATE]: updateStateMenuReducer,
    },
    initialState: initialClientState.menu,
});
