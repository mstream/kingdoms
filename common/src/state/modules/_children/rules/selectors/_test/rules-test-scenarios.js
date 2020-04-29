// @flow

import {
    emptyCommonState,
} from '../../../../state';
import type {
    CommonStateRules,
} from '../../reducer/types';
import type {
    CommonStateSelectorTestScenario,
} from '../../../../types';

type Scenarios =
    $ReadOnlyArray< CommonStateSelectorTestScenario< CommonStateRules >, >;

export const rulesSelectorTestScenarios: Scenarios = [
    {
        expectedValue: emptyCommonState.rules,
        name         : `returns rules`,
        state        : {
            ...emptyCommonState,
            rules: emptyCommonState.rules,
        },
    },
];
