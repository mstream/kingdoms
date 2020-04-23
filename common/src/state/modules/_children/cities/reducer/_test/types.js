// @flow

import type {
    CommonAction,
} from '../../../../../types';
import type {
    CommonStateCities,
} from '../types';
import type {
    CommonStateReducerTestScenario,
} from '../../../../types';

export type CommonStateCitiesReducerTestScenarios<+A: CommonAction,
    > = CommonStateReducerTestScenario< CommonStateCities, A >;
