// @flow

import { emptyClientState } from '../../../../../state';
import type { ClientStateSelectorTestScenario } from '../../../../../types';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<boolean>>;

export const isAuthenticatedSelectorTestScenarios: Scenarios = [
    {
        name: 'returns true when name is present',
        state: {
            ...emptyClientState,
            player: {
                ...emptyClientState.player,
                name: 'player1',
            },
        },
        expectedValue: true,
    },
    {
        name: 'returns false when name is absent',
        state: {
            ...emptyClientState,
            player: {
                ...emptyClientState.player,
                name: null,
            },
        },
        expectedValue: false,
    },
];
