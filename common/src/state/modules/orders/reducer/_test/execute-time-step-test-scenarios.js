// @flow

import type {
    CommonStateOrdersReducerTestScenarios,
} from './types';
import type {
    CommonExecuteTimeStepAction,
} from '../../../time/actions';

type Scenarios = $ReadOnlyArray< CommonStateOrdersReducerTestScenarios< CommonExecuteTimeStepAction >, >;

export const executeTimeStepTestScenarios: Scenarios = [];
