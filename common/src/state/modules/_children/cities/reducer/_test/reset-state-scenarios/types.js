// @flow

import type {
    CommonResetStateAction,
} from '../../../../../../actions/types';
import type {
    CommonStateCitiesReducerTestScenarios,
} from '../types';

export type Scenario =
    CommonStateCitiesReducerTestScenarios< CommonResetStateAction >;

export type Scenarios = $ReadOnlyArray< Scenario, >;
