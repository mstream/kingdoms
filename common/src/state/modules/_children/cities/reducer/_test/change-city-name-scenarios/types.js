// @flow

import type {
    CommonChangeCityNameAction,
} from '../../../actions/types';
import type {
    CommonStateCitiesReducerTestScenarios,
} from '../types';

export type Scenario =
    CommonStateCitiesReducerTestScenarios< CommonChangeCityNameAction >;

export type Scenarios = $ReadOnlyArray< Scenario >
