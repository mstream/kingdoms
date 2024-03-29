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
} from './modules/_children/menu/actions/types';
import {
    DUMMY, SIGN_OUT,
} from './modules/actions/types';
import {
    LOAD_PLAYER,
} from './modules/_children/player/actions/types';
import {
    MOVE_CAMERA,
    ZOOM_CAMERA,
} from './modules/_children/camera/actions/types';
import {
    REPORT_ERRORS,
} from './modules/_children/errors/actions/types';
import {
    REQUEST_BUILDING_UPGRADE,
    REQUEST_CITY_CREATION,
    REQUEST_CITY_NAME_CHANGE,
    REQUEST_ORDER_CREATION,
    UPDATE_STATE,
} from './modules/_children/common-state/actions/types';
import type {
    ClientDummyAction,
    ClientSignOutAction,
} from './modules/actions/types';
import type {
    ClientLoadPlayerAction,
} from './modules/_children/player/actions/types';
import type {
    ClientMoveCameraAction,
    ClientZoomCameraAction,
} from './modules/_children/camera/actions/types';
import type {
    ClientReportErrorsAction,
} from './modules/_children/errors/actions/types';
import type {
    ClientRequestBuildingUpgradeAction,
    ClientRequestCityCreationAction,
    ClientRequestCityNameChangeAction,
    ClientRequestOrderCreationAction,
    ClientUpdateStateAction,
} from './modules/_children/common-state/actions/types';
import type {
    ClientStateCamera,
} from './modules/_children/camera/reducer/types';
import type {
    ClientStateCommonState,
} from './modules/_children/common-state/reducer/types';
import type {
    ClientStateErrors,
} from './modules/_children/errors/reducer/types';
import type {
    ClientStateMenu,
} from './modules/_children/menu/reducer/types';
import type {
    ClientStatePlayer,
} from './modules/_children/player/reducer/types';
import type {
    ClientStateTiles,
} from './modules/_children/tiles/reducer/types';
import type {
    Dispatch, Store,
} from 'redux';
import type {
    MenuAction,
} from './modules/_children/menu/actions/types';

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
    | typeof SIGN_OUT
    | typeof UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE
    | typeof UPDATE_ATTACK_VIEW_MINIMUM_DELAY
    | typeof UPDATE_STATE
    | typeof ZOOM_CAMERA;

export type ClientAction =
    | MenuAction
    | ClientDummyAction
    | ClientLoadPlayerAction
    | ClientMoveCameraAction
    | ClientReportErrorsAction
    | ClientRequestBuildingUpgradeAction
    | ClientRequestCityCreationAction
    | ClientRequestCityNameChangeAction
    | ClientRequestOrderCreationAction
    | ClientSignOutAction
    | ClientUpdateStateAction
    | ClientZoomCameraAction;

export type ClientActionCreator<A: ClientAction> = (
    $PropertyType< A, 'payload' >,
) => A;

export type ClientState = $ReadOnly< {
    camera: ClientStateCamera,
    errors: ClientStateErrors,
    menu: ClientStateMenu,
    player: ClientStatePlayer,
    commonState: ClientStateCommonState,
    tiles: ClientStateTiles,
} >;

export type ClientStateReducer<S> = ( S, ClientAction, ClientState ) => S;

export type ClientStateActionReducer<S, +A: ClientAction> = (
    $ReadOnly< { action: A, globalState: ClientState, localState: S } >,
) => S;

export type ClientStateReducerTestScenario<S, +A: ClientAction> = $ReadOnly< {
    name: string,
    action: A,
    previousGlobalState: ClientState,
    expectedLocalStateCreator: ( { previousLocalState: S } ) => S,
} >;

export type ClientStateSelector<T, P> = ( state: ClientState, props: P ) => T;

export type ClientStateSelectorTestScenario<T> = $ReadOnly< {
    name: string,
    state: ClientState,
    expectedValue: T,
} >;

export type ClientStateSelectors = $ReadOnly< {

    // $FlowFixMe
    [string]: ClientStateSelector< any, any >,
} >;

export type ClientStore = Store< ClientState,
    ClientAction,

    // $FlowFixMe
    Dispatch< ClientAction >, >;

export type ActionReducers<S> = $ReadOnly< {
    [ClientActionKey]: ClientStateActionReducer< S, ClientAction >,
} >;

type ReducerScenario<S> = ClientStateReducerTestScenario< S, ClientAction >;

export type ReducerScenarios<S> = {
    [ClientActionKey]: $ReadOnlyArray< ReducerScenario< S > >,
};

// $FlowFixMe
export type SelectorScenario = ClientStateSelectorTestScenario< any >;

export type SelectorScenarios = $ReadOnlyArray< SelectorScenario >;

export type ScenariosBySelector = $ReadOnly< {
    [string]: SelectorScenarios,
} >;
