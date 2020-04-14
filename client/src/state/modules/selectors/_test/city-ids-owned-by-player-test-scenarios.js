// @flow

import {
    emptyCommonState,
} from '../../../../../../common/src/state/modules/state';
import {
    emptyCityState,
} from '../../../../../../common/src/state/modules/cities/reducer/state';
import {
    emptyClientState,
} from '../../../state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< ?$ReadOnlyArray< string > >, >;

export const cityIdsOwnedByPlayersSelectorTestScenarios: Scenarios = [
    {
        expectedValue: null,
        name         : `returns null if common state is not loaded`,
        state        : {
            ...emptyClientState,
            commonState: null,
        },
    },
    {
        expectedValue: [
            `city1`,
            `city3`,
        ],
        name : `returns ids of cities owned by the player`,
        state: {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
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
                        ownerId: `player1`,
                    },
                },
            },
            player: {
                name: `player1`,
            },
        },
    },
];
