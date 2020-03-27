// @flow

import type { ClientStateSelectorTestScenario } from '../../../types';
import { emptyClientState } from '../../../state';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<boolean>>

export const anyErrorsSelectorTestScenarios: Scenarios = [
    {
        name: 'returns true when at least one error present',
        state: {
            ...emptyClientState,
            errors: ['error1'],
        },
        expectedValue: true,
    },
    {
        name: 'returns false when no errors present',
        state: {
            ...emptyClientState,
            errors: [],
        },
        expectedValue: false,
    },
];
