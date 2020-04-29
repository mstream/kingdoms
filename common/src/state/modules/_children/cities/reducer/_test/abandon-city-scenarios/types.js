// @flow


import type {
    CommonAbandonCityAction,
} from '../../../actions/types';
import type {
    CommonStateCitiesReducerTestScenarios,
} from '../types';

export type Scenario =
    CommonStateCitiesReducerTestScenarios< CommonAbandonCityAction >;

export type Scenarios = $ReadOnlyArray< Scenario >;
