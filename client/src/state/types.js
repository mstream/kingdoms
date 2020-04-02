// @flow

import type { ClientDummyAction } from './modules/actions/types';
import { DUMMY } from './modules/actions/types';
import type { ClientReportErrorsAction } from './modules/_children/errors/actions/types';
import { REPORT_ERRORS } from './modules/_children/errors/actions/types';
import type {
    ClientMoveCameraAction,
    ClientZoomCameraAction,
} from './modules/_children/camera/actions/types';
import {
    MOVE_CAMERA,
    ZOOM_CAMERA,
} from './modules/_children/camera/actions/types';
import type {
    ClientRequestBuildingUpgradeAction,
    ClientRequestCityCreationAction,
    ClientRequestCityNameChangeAction,
    ClientRequestOrderCreationAction,
    ClientUpdateStateAction,
} from './modules/_children/common-state/actions/types';
import {
    REQUEST_BUILDING_UPGRADE,
    REQUEST_CITY_CREATION,
    REQUEST_CITY_NAME_CHANGE,
    REQUEST_ORDER_CREATION,
    UPDATE_STATE,
} from './modules/_children/common-state/actions/types';
import type {
    ClientCloseAttackViewAction,
    ClientCloseCityViewAction,
    ClientOpenAttackViewAction,
    ClientOpenCityViewAction,
    ClientSelectAttackViewAttackingCityAction,
    ClientSelectCityViewBuildingsTabAction,
    ClientSelectCityViewOrdersTabAction,
    ClientSelectCityViewResourceTabAction,
    ClientSelectCityViewTabAction,
    ClientSelectCityViewUnitsTabAction,
    ClientUpdateAttackViewMinimumDelayAction,
    ClientUpdateAttackViewRegimentTemplateAction,
} from './modules/_children/menu/actions/types';
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
} from './modules/_children/menu/actions/types';
import type { ClientLoadPlayerAction } from './modules/_children/player/actions/types';
import { LOAD_PLAYER } from './modules/_children/player/actions/types';
import type { Dispatch, Store } from 'redux';
import type { ClientStateCamera } from './modules/_children/camera/reducer/types';
import type { ClientStateErrors } from './modules/_children/errors/reducer/types';
import type { ClientStateMenu } from './modules/_children/menu/reducer/types';
import type { ClientStatePlayer } from './modules/_children/player/reducer/types';
import type { ClientStateCommonState } from './modules/_children/common-state/reducer/types';
import type { ClientStateTiles } from './modules/_children/tiles/reducer/types';

export type ClientActionKey =
    | typeof CLOSE_ATTACK_VIEW
    | typeof CLOSE_CITY_VIEW
    | typeof DUMMY
    | typeof LOAD_PLAYER
    | typeof MOVE_CAMERA
    | typeof OPEN_ATTACK_VIEW
    | typeof OPEN_CITY_VIEW
    | typeof REPORT_ERRORS
    | typeof REQUEST_BUILDING_UPGRADE
    | typeof REQUEST_CITY_CREATION
    | typeof REQUEST_CITY_NAME_CHANGE
    | typeof REQUEST_ORDER_CREATION
    | typeof SELECT_ATTACK_VIEW_ATTACKING_CITY
    | typeof SELECT_CITY_VIEW_BUILDINGS_TAB
    | typeof SELECT_CITY_VIEW_ORDERS_TAB
    | typeof SELECT_CITY_VIEW_RESOURCES_TAB
    | typeof SELECT_CITY_VIEW_UNITS_TAB
    | typeof SELECT_CITY_VIEW_TAB
    | typeof UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE
    | typeof UPDATE_ATTACK_VIEW_MINIMUM_DELAY
    | typeof UPDATE_STATE
    | typeof ZOOM_CAMERA;

export type ClientAction =
    | ClientCloseAttackViewAction
    | ClientCloseCityViewAction
    | ClientDummyAction
    | ClientLoadPlayerAction
    | ClientMoveCameraAction
    | ClientOpenAttackViewAction
    | ClientOpenCityViewAction
    | ClientReportErrorsAction
    | ClientRequestBuildingUpgradeAction
    | ClientRequestCityCreationAction
    | ClientRequestCityNameChangeAction
    | ClientRequestOrderCreationAction
    | ClientSelectAttackViewAttackingCityAction
    | ClientSelectCityViewBuildingsTabAction
    | ClientSelectCityViewOrdersTabAction
    | ClientSelectCityViewResourceTabAction
    | ClientSelectCityViewUnitsTabAction
    | ClientSelectCityViewTabAction
    | ClientUpdateAttackViewRegimentTemplateAction
    | ClientUpdateAttackViewMinimumDelayAction
    | ClientUpdateStateAction
    | ClientZoomCameraAction;

export type ClientActionCreator<A: ClientAction> = (
    $PropertyType<A, 'payload'>,
) => A;

export type ClientState = $ReadOnly<{
    camera: ClientStateCamera,
    errors: ClientStateErrors,
    menu: ClientStateMenu,
    player: ClientStatePlayer,
    commonState: ClientStateCommonState,
    tiles: ClientStateTiles,
}>;

export type ClientStateReducer<S> = (S, ClientAction, ClientState) => S;

export type ClientStateActionReducer<S, +A: ClientAction> = (
    $ReadOnly<{ action: A, globalState: ClientState, localState: S }>,
) => S;

export type ClientStateReducerTestScenario<S, +A: ClientAction> = $ReadOnly<{
    name: string,
    action: A,
    previousGlobalState: ClientState,
    expectedLocalStateCreator: ({ previousLocalState: S }) => S,
}>;

export type ClientStateSelector<T> = (state: ClientState) => T;

export type ClientStateSelectorTestScenario<T> = $ReadOnly<{
    name: string,
    state: ClientState,
    expectedValue: T,
}>;

export type ClientStateSelectors = $ReadOnly<{
    [string]: ClientStateSelector<mixed>,
}>;

// $FlowFixMe
export type ClientStore = Store<
    ClientState,
    ClientAction,
    Dispatch<ClientAction>,
>;

export type ActionReducers<S> = $ReadOnly<{
    [ClientActionKey]: ClientStateActionReducer<S, ClientAction>,
}>;

export type ReducerScenarios<S> = {
    [ClientActionKey]: $ReadOnlyArray<
        ClientStateReducerTestScenario<S, ClientAction>,
    >,
};

export type SelectorScenarios = $ReadOnly<{
    [string]: $ReadOnlyArray<ClientStateSelectorTestScenario<mixed>>,
}>;
