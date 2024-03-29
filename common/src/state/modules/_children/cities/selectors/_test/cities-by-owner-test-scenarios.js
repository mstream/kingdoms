// @flow

import {
    emptyCityState,
} from '../../reducer/state';
import {
    emptyCommonState,
} from '../../../../state';
import type {
    CitiesByOwner,
} from '../types';
import type {
    CommonStateSelectorTestScenario,
} from '../../../../types';

type Scenarios = $ReadOnlyArray< CommonStateSelectorTestScenario< CitiesByOwner > >;

export const citiesByOwnerSelectorTestScenarios: Scenarios = [
    {
        expectedValue: {
            player1: [
                {
                    ...emptyCityState,
                    ownerId: `player1`,
                },
            ],
            player2: [
                {
                    ...emptyCityState,
                    ownerId: `player2`,
                },
                {
                    ...emptyCityState,
                    ownerId: `player2`,
                },
            ],
        },
        name : `returns city ids grouped by owner id`,
        state: {
            ...emptyCommonState,
            cities: {
                ...emptyCommonState.cities,
                city1: {
                    ...emptyCityState,
                    ownerId: `player1`,
                },
                city2: {
                    ...emptyCityState,
                    ownerId: `player2`,
                },
                city3: {
                    ...emptyCityState,
                    ownerId: `player2`,
                },
            },
        },
    },
];
