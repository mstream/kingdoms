// @flow


import type {
    CommonStateSelectorTestScenario,
} from '../../../types';
import { emptyCommonState } from '../../../state';
import type { Vector } from '../../../../../vector';

type Scenarios = $ReadOnlyArray<CommonStateSelectorTestScenario<Vector>>

export const minimalCityMarginSelectorTestScenarios: Scenarios = [
    {
        name: 'returns the minimal city margin',
        state: {
            ...emptyCommonState,
            rules: {
                ...emptyCommonState.rules,
                minimalCityMargin: {
                    x: 3,
                    y: 3,
                },
            },
        },
        expectedValue: {
            x: 3,
            y: 3,
        },
    },
];
