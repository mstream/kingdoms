// @flow

import type {
    CommonAction,
} from '../../../../types';
import type {
    CommonStateReducerTestScenario,
} from '../../../types';
import type {
    CommonStateTime,
} from '../types';

export type CommonStateTimeReducerTestScenarios<+A: CommonAction,
    > = CommonStateReducerTestScenario< CommonStateTime, A >;
