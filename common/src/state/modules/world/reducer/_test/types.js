// @flow

import type {
    CommonAction,
} from '../../../../types';
import type {
    CommonStateReducerTestScenario,
} from '../../../types';
import type {
    CommonStateWorld,
} from '../types';

export type CommonStateWorldReducerTestScenarios<+A: CommonAction,
    > = CommonStateReducerTestScenario< CommonStateWorld, A >;
