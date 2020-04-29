// @flow

import type {
    CommonCreateCityAction,
} from '../../../actions/types';
import type {
    CommonStateCitiesReducerTestScenarios,
} from '../types';

export type Scenario =
    CommonStateCitiesReducerTestScenarios< CommonCreateCityAction >;

export type Scenarios = $ReadOnlyArray< Scenario, >;
