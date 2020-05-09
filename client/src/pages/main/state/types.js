// @flow


import {
    DUMMY, SIGN_OUT,
} from './modules/actions/types';
import type {
    ClientDummyAction,
    ClientSignOutAction,
} from './modules/actions/types';


import type {
    ClientStateErrors,
} from './modules/_children/errors/reducer/types';

import type {
    ClientStatePlayer,
} from './modules/_children/player/reducer/types';

import {
    FAIL_WORLDS_UPDATE,
    REQUEST_WORLDS_UPDATE,
    SUCCEED_WORLDS_UPDATE,
} from './modules/_children/worlds/actions/types';
import {
    LOAD_PLAYER,
} from './modules/_children/player/actions/types';
import {
    REPORT_ERRORS,
} from './modules/_children/errors/actions/types';
import type {
    ClientFailWorldsUpdateAction,
    ClientRequestWorldsUpdateAction,
    ClientSucceedWorldsUpdateAction,
} from './modules/_children/worlds/actions/types';
import type {
    ClientLoadPlayerAction,
} from './modules/_children/player/actions/types';
import type {
    ClientReportErrorsAction,
} from './modules/_children/errors/actions/types';
import type {
    ClientStateWorlds,
} from './modules/_children/worlds/reducer/types';
import type {
    Dispatch, Store,
} from 'redux';


export type ClientActionKey =
    | typeof DUMMY
    | typeof FAIL_WORLDS_UPDATE
    | typeof LOAD_PLAYER
    | typeof REPORT_ERRORS
    | typeof REQUEST_WORLDS_UPDATE
    | typeof SIGN_OUT
    | typeof SUCCEED_WORLDS_UPDATE;

export type ClientAction =
    | ClientDummyAction
    | ClientFailWorldsUpdateAction
    | ClientLoadPlayerAction
    | ClientReportErrorsAction
    | ClientRequestWorldsUpdateAction
    | ClientSignOutAction
    | ClientSucceedWorldsUpdateAction;

export type ClientActionCreator<A: ClientAction> = (
    $PropertyType< A, 'payload' >,
) => A;

export type ClientState = $ReadOnly< {
    errors: ClientStateErrors,
    player: ClientStatePlayer,
    worlds: ClientStateWorlds,
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
