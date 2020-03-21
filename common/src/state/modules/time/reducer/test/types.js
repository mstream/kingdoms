// @flow

import type { CommonStateReducerTestScenario } from '../../../types';
import type { CommonStateTime } from '../types';
import type { CommonAction } from '../../../../types';

export type CommonStateTimeReducerTestScenarios<+A: CommonAction> = CommonStateReducerTestScenario<CommonStateTime, A>;