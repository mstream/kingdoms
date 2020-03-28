// @flow

import { emptyClientState } from '../../../../../state';
import type { ClientStateSelectorTestScenario } from '../../../../../types';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<?string>>;

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
