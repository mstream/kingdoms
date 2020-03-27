// @flow


import type { CommonStateSelectorTestScenario } from '../../../types';
import { emptyCommonState } from '../../../state';
import { emptyCityState } from '../../reducer/state';
import type { CityIdsByOwner } from '../types';

type Scenarios = $ReadOnlyArray<CommonStateSelectorTestScenario<CityIdsByOwner>>

export const cityIdsByOwnerSelectorTestScenarios: Scenarios = [
    {
        name: 'returns city ids grouped by owner id',
        state: {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
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
                    ownerId: 'player2',
                },
            },
        },
        expectedValue: {
            'player1': ['city1'],
            'player2': ['city2', 'city3'],
        },
    },
];
