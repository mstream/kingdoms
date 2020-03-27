// @flow


import type { CommonStateSelectorTestScenario } from '../../../types';
import { emptyCommonState } from '../../../state';
import type { CommonStateUnitStats } from '../../reducer/types';

type Scenarios = $ReadOnlyArray<CommonStateSelectorTestScenario<CommonStateUnitStats>>

export const unitStatsSelectorTestScenarios: Scenarios = [
    {
        name: 'returns unit stats',
        state: {
            ...emptyCommonState,
            rules: {
                ...emptyCommonState.rules,
                unitStats: emptyCommonState.rules.unitStats,
            },
        },
        expectedValue: emptyCommonState.rules.unitStats,
    },
];