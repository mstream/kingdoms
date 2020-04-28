// @flow
import type {
    CommonAction,
} from '../../../../../types';
import type {
    CommonStateReducerTestScenario,
} from '../../../../types';
import type {
    CommonStateRules,
} from '../types';

export type CommonStateRulesReducerTestScenario<+A: CommonAction,
    > = CommonStateReducerTestScenario< CommonStateRules, A >;
