// @flow

import { emptyClientState } from '../../../../../state';
import { bool } from 'aws-sdk/clients/signer';
import type { ClientStateSelectorTestScenario } from '../../../../../types';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<bool>>

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
