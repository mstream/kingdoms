// @flow

import {
    CLOSE_ATTACK_VIEW,
    CLOSE_CITY_VIEW,
    OPEN_ATTACK_VIEW,
    OPEN_CITY_VIEW,
    SELECT_ATTACK_VIEW_ATTACKING_CITY,
    SELECT_CITY_VIEW_BUILDINGS_TAB,
    SELECT_CITY_VIEW_ORDERS_TAB,
    SELECT_CITY_VIEW_RESOURCES_TAB,
    SELECT_CITY_VIEW_TAB,
    SELECT_CITY_VIEW_UNITS_TAB,
    UPDATE_ATTACK_VIEW_MINIMUM_DELAY,
    UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
} from '../actions/types';
import {
    REQUEST_CITY_CREATION,
    REQUEST_ORDER_CREATION,
    UPDATE_STATE,
} from '../../common-state/actions/types';
import {
    closeAttackViewMenuReducer,
} from './_impl/close-attack-view';
import {
    closeCityViewMenuReducer,
} from './_impl/close-city-view';
import {
    createClientStateReducer,
} from '../../../../utils';
import {
    initialClientState,
} from '../../../../state';
import {
    openAttackViewMenuReducer,
} from './_impl/open-attack-view';
import {
    openCityViewMenuReducer,
} from './_impl/open-city-view';
import {
    requestCityCreationMenuReducer,
} from './_impl/request-city-creation';
import {
    requestOrderCreationMenuReducer,
} from './_impl/request-order-creation';
import {
    selectAttackViewAttackingCityReducer,
} from './_impl/select-attack-view-attacking-city';
import {
    selectCityViewBuildingsTabMenuReducer,
} from './_impl/select-city-view-buildings-tab';
import {
    selectCityViewOrdersTabMenuReducer,
} from './_impl/select-city-view-orders-tab';
import {
    selectCityViewResourcesTabMenuReducer,
} from './_impl/select-city-view-resources-tab';
import {
    selectCityViewTabMenuReducer,
} from './_impl/select-city-view-tab';
import {
    selectCityViewUnitTabMenuReducer,
} from './_impl/select-city-view-unit-tab';
import {
    updateAttackViewMinimumDelayReducer,
} from './_impl/update-attack-view-minimum-delay-template';
import {
    updateAttackViewRegimentTemplateReducer,
} from './_impl/update-attack-view-regiment-template';
import {
    updateStateMenuReducer,
} from './_impl/update-state';
import type {
    ClientStateMenu,
} from './types';

export const menuReducer = createClientStateReducer<ClientStateMenu>(
    {
        actionReducers: {
            [ CLOSE_ATTACK_VIEW ]                   : closeAttackViewMenuReducer,
            [ CLOSE_CITY_VIEW ]                     : closeCityViewMenuReducer,
            [ OPEN_ATTACK_VIEW ]                    : openAttackViewMenuReducer,
            [ OPEN_CITY_VIEW ]                      : openCityViewMenuReducer,
            [ REQUEST_CITY_CREATION ]               : requestCityCreationMenuReducer,
            [ REQUEST_ORDER_CREATION ]              : requestOrderCreationMenuReducer,
            [ SELECT_ATTACK_VIEW_ATTACKING_CITY ]   : selectAttackViewAttackingCityReducer,
            [ SELECT_CITY_VIEW_BUILDINGS_TAB ]      : selectCityViewBuildingsTabMenuReducer,
            [ SELECT_CITY_VIEW_ORDERS_TAB ]         : selectCityViewOrdersTabMenuReducer,
            [ SELECT_CITY_VIEW_RESOURCES_TAB ]      : selectCityViewResourcesTabMenuReducer,
            [ SELECT_CITY_VIEW_TAB ]                : selectCityViewTabMenuReducer,
            [ SELECT_CITY_VIEW_UNITS_TAB ]          : selectCityViewUnitTabMenuReducer,
            [ UPDATE_ATTACK_VIEW_MINIMUM_DELAY ]    : updateAttackViewMinimumDelayReducer,
            [ UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE ]: updateAttackViewRegimentTemplateReducer,
            [ UPDATE_STATE ]                        : updateStateMenuReducer,
        },
        initialState: initialClientState.menu,
    },
);
