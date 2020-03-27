// @flow


import { emptyCommonState } from '../../../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../../../common/src/state/modules/cities/reducer/state';
import type { ClientStateSelectorTestScenario } from '../../types';
import { emptyClientState } from '../../state';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<boolean>>;

export const isGameStartingSelectorTestScenarios: Scenarios = [
    {
        name: 'returns true when player is loaded and they do not have any cities',
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
                        ownerId: 'player2',
                    },
                    'city2': {
                        ...emptyCityState,
                        ownerId: 'player3',
                    },
                },
            },
        },
        expectedValue: true,
    },
    {
        name: 'returns false when player is not loaded',
        state: {
            ...emptyClientState,
            player: {
                name: null,
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                        ownerId: 'player2',
                    },
                    'city2': {
                        ...emptyCityState,
                        ownerId: 'player3',
                    },
                },
            },
        },
        expectedValue: false,
    },
    {
        name: 'returns false when player owns cities',
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
                },
            },
        },
        expectedValue: false,
    },
];
