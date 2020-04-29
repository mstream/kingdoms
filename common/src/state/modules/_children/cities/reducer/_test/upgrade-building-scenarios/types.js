// @flow

import type {
    CommonStateCitiesReducerTestScenarios,
} from '../types';
import type {
    CommonUpgradeBuildingAction,
} from '../../../actions/types';

export type Scenario =
    CommonStateCitiesReducerTestScenarios< CommonUpgradeBuildingAction >;

export type Scenarios = $ReadOnlyArray< Scenario >;
