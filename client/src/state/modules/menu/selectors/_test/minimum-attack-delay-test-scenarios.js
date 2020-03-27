// @flow

import type { ClientStateSelectorTestScenario } from '../../../types';
import { emptyClientState } from '../../../state';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<number>>

export const minimumAttackDelaySelectorTestScenarios: Scenarios = [
    {
        name: 'returns the minimum attack delay',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    minimumDelay: 60,
                },
            },
        },
        expectedValue: 60,
    },
];
