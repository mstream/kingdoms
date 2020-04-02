// @flow
import type { CommonStateReducerTestScenario } from '../../../types';
import type { CommonStateRules } from '../types';
import type { CommonAction } from '../../../../types';

export type CommonStateRulesReducerTestScenarios<
    +A: CommonAction,
> = CommonStateReducerTestScenario<CommonStateRules, A>;
