// @flow
// @flow-runtime

import type {
    CommonStateRules,
    CommonStateUnitKey,
} from './rules/reducer/types';
import { reify, Type } from 'flow-runtime';
import type { CommonStateCities } from './cities/reducer/types';
import type { CommonStateTime } from './time/reducer/types';
import type { CommonStateWorld } from './world/reducer/types';
import type { Range } from '../../range';
import type { CommonAction } from '../actions/types';

export type CommonState = $ReadOnly<{
    cities: CommonStateCities,
    rules: CommonStateRules,
    time: CommonStateTime,
    world: CommonStateWorld,
}>;

export type CommonStateReducerResult<S> = $ReadOnly<{
    errors: $ReadOnlyArray<string>,
    state: ?S,
}>;

export type CommonStateReducer<S> = (S, CommonAction, CommonState) => CommonStateReducerResult<S>;

export type CommonStateReducerTestScenario<S, +A: CommonAction> = $ReadOnly<{
    name: string,
    action: A,
    previousGlobalState: CommonState,
    expectedReductionResultCreator: ({ previousLocalState: S }) => CommonStateReducerResult<S>,
}>;

export type CommonStateRegimentTemplate = $ReadOnly<{ [CommonStateUnitKey]: Range, ... }>;

export const CommonStateType = (reify: Type<CommonState>);
