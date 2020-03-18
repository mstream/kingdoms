// @flow
import type { CommonAction } from '../../../../actions/types';
import type { CommonStateReducerTestScenario } from '../../../types';
import type { CommonStateRules } from '../types';

export type CommonStateRulesReducerTestScenarios<A: CommonAction> = CommonStateReducerTestScenario<CommonStateRules, A>;