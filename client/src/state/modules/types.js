// @flow

import type { ClientStateCamera } from './camera/reducer/types';
import type { ClientStateMenu } from './menu/reducer/types';
import type { ClientStateTiles } from './tiles/reducer/types';
import type { ClientStatePlayer } from './player/reducer/types';
import type { ClientStateCommonState } from './common-state/reducer/types';
import type { ClientStateErrors } from './errors/reducer/types';
import type { ClientAction } from '../types';

export type ClientState = $ReadOnly<{
    camera: ClientStateCamera,
    errors: ClientStateErrors,
    menu: ClientStateMenu,
    player: ClientStatePlayer,
    commonState: ClientStateCommonState,
    tiles: ClientStateTiles,
}>;

export type ClientStateReducer<S> = (S, ClientAction, ClientState) => S;

export type ClientStateActionReducer<S, +A: ClientAction> = ($ReadOnly<{ action: A, globalState: ClientState, localState: S, }>) => S;

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

export type ClientStateSelectors = $ReadOnly<{ [string]: ClientStateSelector<mixed>, ... }>;