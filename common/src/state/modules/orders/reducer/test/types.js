// @flow

import type { CommonStateReducerTestScenario } from '../../../types';
import type { CommonStateOrders } from '../types';
import type { CommonAction } from '../../../../types';

export type CommonStateOrdersReducerTestScenarios<+A: CommonAction> = CommonStateReducerTestScenario<CommonStateOrders, A>;