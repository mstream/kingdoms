// @flow

import {
    emptyCommonState,
} from '../../../../state';
import type {
    CommonStateSelectorTestScenario,
} from '../../../../types';
import type {
    CommonStateUnitStats,
} from '../../reducer/types';

type Scenarios = $ReadOnlyArray< CommonStateSelectorTestScenario< CommonStateUnitStats >, >;

export const unitStatsSelectorTestScenarios: Scenarios = [
    {
        expectedValue: emptyCommonState.rules.unitStats,
        name         : `returns unit stats`,
        state        : {
            ...emptyCommonState,
            rules: {
                ...emptyCommonState.rules,
                unitStats: emptyCommonState.rules.unitStats,
            },
        },
    },
];
