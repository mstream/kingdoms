// @flow


import type {
    CommonStateSelector,
    CommonStateSelectorTestScenario,
} from '../../../types';
import { emptyCommonState } from '../../../state';
import type { CommonStateRules } from '../../reducer/types';

type Scenarios = $ReadOnlyArray<CommonStateSelectorTestScenario<CommonStateRules>>

export const rulesSelectorTestScenarios: Scenarios = [
    {
        name: 'returns rules',
        state: {
            ...emptyCommonState,
            rules: emptyCommonState.rules,
        },
        expectedValue: emptyCommonState.rules,
    },
];
