// @flow

import type { CommonStateReducerTestScenario } from '../../../types';
import type { CommonStateCities } from '../types';
import type { CommonAction } from '../../../../types';

export type CommonStateCitiesReducerTestScenarios<
    +A: CommonAction,
> = CommonStateReducerTestScenario<CommonStateCities, A>;
