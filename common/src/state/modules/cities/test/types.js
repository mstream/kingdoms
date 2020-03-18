// @flow

import type { CommonAction } from '../../../actions/types';
import type { CommonStateReducerTestScenario } from '../../types';
import type { CommonStateCities } from '../reducer/types';

export type CommonStateCitiesReducerTestScenarios<A: CommonAction> = CommonStateReducerTestScenario<CommonStateCities, A>;
