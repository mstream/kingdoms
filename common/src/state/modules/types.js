// @flow

/*
 *
 */

// @flow-runtime

import {
    Type, reify,
} from 'flow-runtime';
import type {
    CommonAction,
} from '../types';
import type {
    CommonStateCities,
} from './_children/cities/reducer/types';
import type {
    CommonStateOrders,
} from './_children/orders/reducer/types';
import type {
    CommonStatePlayers,
} from './_children/players/reducer/types';
import type {
    CommonStateRules,
} from './_children/rules/reducer/types';
import type {
    CommonStateTime,
} from './_children/time/reducer/types';
import type {
    CommonStateWorld,
} from './_children/world/reducer/types';

export type CommonState = $ReadOnly< {
    cities: CommonStateCities,
    orders: CommonStateOrders,
    players: CommonStatePlayers,
    rules: CommonStateRules,
    time: CommonStateTime,
    world: CommonStateWorld,
} >;

export type CommonStateReducerResult<S> = $ReadOnly< {
    errors: $ReadOnlyArray< string >,
    state: ?S,
} >;

export type CommonStateReducer<S> = (
    S,
    CommonAction,
    CommonState,
) => CommonStateReducerResult< S >;

export type CommonStateActionReducer<S, +A: CommonAction> = (
    $ReadOnly< { action: A, globalState: CommonState, localState: S } >,
) => CommonStateReducerResult< S >;

export type CommonStateReducerTestScenario<S, +A: CommonAction> = $ReadOnly< {
    name: string,
    action: A,
    previousGlobalState: CommonState,
    expectedReductionResultCreator: ( {
                                         previousLocalState: S,
                                     } ) => CommonStateReducerResult< S >,
} >;

export type CommonStateSelector<T, P> = ( state: CommonState, props: P ) => T;

export type CommonStateSelectorTestScenario<T> = $ReadOnly< {
    name: string,
    state: CommonState,
    expectedValue: T,
} >;

export type CommonStateSelectors = $ReadOnly< {

    // $FlowFixMe
    [string]: CommonStateSelector< any, any >,
} >;

export const CommonStateType = ( reify: Type< CommonState > );
