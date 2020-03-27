// @flow


import { emptyCommonState } from '../../../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../../../common/src/state/modules/cities/reducer/state';
import type { ClientStateSelectorTestScenario } from '../../types';
import { emptyClientState } from '../../state';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<?$ReadOnlyArray<string>>>;

export const cityIdsOwnedByPlayersSelectorTestScenarios: Scenarios = [
    {
        name: 'returns null if common state is not loaded',
        state: {
            ...emptyClientState,
            commonState: null,
        },
        expectedValue: null,
    },
    {
        name: 'returns ids of cities owned by the player',
        state: {
            ...emptyClientState,
            player: {
                name: 'player1',
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                    'city2': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                    'city3': {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                },
            },
        },
        expectedValue: [
            'city1',
            'city3',
        ],
    },
];
