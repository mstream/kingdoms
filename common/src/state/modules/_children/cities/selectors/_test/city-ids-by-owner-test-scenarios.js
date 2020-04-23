// @flow

import {
    emptyCityState,
} from '../../reducer/state';
import {
    emptyCommonState,
} from '../../../../state';
import type {
    CityIdsByOwner,
} from '../types';
import type {
    CommonStateSelectorTestScenario,
} from '../../../../types';

type Scenarios = $ReadOnlyArray< CommonStateSelectorTestScenario< CityIdsByOwner >, >;

export const cityIdsByOwnerSelectorTestScenarios: Scenarios = [
    {
        expectedValue: {
            player1: [
                `city1`,
            ],
            player2: [
                `city2`,
                `city3`,
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
