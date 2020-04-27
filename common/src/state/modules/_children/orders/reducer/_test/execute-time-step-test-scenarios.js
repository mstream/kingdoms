// @flow

import type {
    CommonExecuteTimeStepAction,
} from '../../../time/actions';
import type {
    CommonStateOrdersReducerTestScenarios,
} from './types';

type Scenario = CommonStateOrdersReducerTestScenarios< CommonExecuteTimeStepAction >;
type Scenarios = $ReadOnlyArray< Scenario >;

export const executeTimeStepTestScenarios: Scenarios = [];
