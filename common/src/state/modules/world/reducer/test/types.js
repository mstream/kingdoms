// @flow

import type { CommonStateReducerTestScenario } from '../../../types';
import type { CommonStateWorld } from '../types';
import type { CommonAction } from '../../../../types';

export type CommonStateWorldReducerTestScenarios<
    +A: CommonAction,
> = CommonStateReducerTestScenario<CommonStateWorld, A>;
