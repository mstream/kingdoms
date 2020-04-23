// @flow

import type {
    CommonExecuteTimeStepAction,
} from '../../../time/actions';
import type {
    CommonStateOrdersReducerTestScenarios,
} from './types';

type Scenarios = $ReadOnlyArray< CommonStateOrdersReducerTestScenarios< CommonExecuteTimeStepAction >, >;

export const executeTimeStepTestScenarios: Scenarios = [];
