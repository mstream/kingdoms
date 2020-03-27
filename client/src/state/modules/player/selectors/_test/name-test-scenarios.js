// @flow

import type { ClientStateSelectorTestScenario } from '../../../types';
import { emptyClientState } from '../../../state';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<?string>>

export const nameSelectorTestScenarios: Scenarios = [
    {
        name: 'returns player name',
        state: {
            ...emptyClientState,
            player: {
                ...emptyClientState.player,
                name: 'player1',
            },
        },
        expectedValue: 'player1',
    },
];
