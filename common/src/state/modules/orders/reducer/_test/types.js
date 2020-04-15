// @flow

import type {
    CommonAction,
} from '../../../../types';
import type {
    CommonStateOrders,
} from '../types';
import type {
    CommonStateReducerTestScenario,
} from '../../../types';

export type CommonStateOrdersReducerTestScenarios<+A: CommonAction,
    > = CommonStateReducerTestScenario< CommonStateOrders, A >;
