// @flow
// @flow-runtime

import type { CommonStateRules } from './rules/reducer/types';
import { reify, Type } from 'flow-runtime';
import type { CommonStateCities } from './cities/reducer/types';
import type { CommonStateTime } from './time/reducer/types';
import type { CommonStateWorld } from './world/reducer/types';
import type { CommonStateOrders } from './orders/reducer/types';
import type { CommonAction } from '../types';
import type { CommonStatePlayers } from './players/reducer/types';

export type CommonState = $ReadOnly<{
    cities: CommonStateCities,
    orders: CommonStateOrders,
    players: CommonStatePlayers,
    rules: CommonStateRules,
    time: CommonStateTime,
    world: CommonStateWorld,
}>;

export type CommonStateReducerResult<S> = $ReadOnly<{
    errors: $ReadOnlyArray<string>,
    state: ?S,
}>;

export type CommonStateReducer<S> = (
    S,
    CommonAction,
    CommonState,
) => CommonStateReducerResult<S>;

export type CommonStateActionReducer<S, +A: CommonAction> = (
    $ReadOnly<{ action: A, globalState: CommonState, localState: S }>,
) => CommonStateReducerResult<S>;

export type CommonStateReducerTestScenario<S, +A: CommonAction> = $ReadOnly<{
    name: string,
    action: A,
    previousGlobalState: CommonState,
    expectedReductionResultCreator: ({
        previousLocalState: S,
    }) => CommonStateReducerResult<S>,
}>;

export type CommonStateSelector<T> = (state: CommonState) => T;

export type CommonStateSelectorTestScenario<T> = $ReadOnly<{
    name: string,
    state: CommonState,
    expectedValue: T,
}>;

export type CommonStateSelectors = $ReadOnly<{
    [string]: CommonStateSelector<mixed>,
}>;

export const CommonStateType = (reify: Type<CommonState>);
