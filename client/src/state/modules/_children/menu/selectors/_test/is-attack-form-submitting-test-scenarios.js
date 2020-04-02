// @flow

import { emptyClientState } from '../../../../../state';
import type { ClientStateSelectorTestScenario } from '../../../../../types';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<boolean>>;

export const isAttackFormSubmittingSelectorTestScenarios: Scenarios = [
    {
        name: 'returns if attack view is submitting',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    isSubmitting: true,
                },
            },
        },
        expectedValue: true,
    },
];
