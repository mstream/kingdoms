// @flow


import type {
    CommonExecuteTimeStepAction,
} from '../../../../time/actions';
import type {
    CommonStateCitiesReducerTestScenarios,
} from '../types';

export type Scenario =
    CommonStateCitiesReducerTestScenarios< CommonExecuteTimeStepAction >;

export type Scenarios = $ReadOnlyArray< Scenario >;
