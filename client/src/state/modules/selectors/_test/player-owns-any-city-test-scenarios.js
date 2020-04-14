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

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< boolean > >;

export const playerOwnsAnyCitySelectorTestScenarios: Scenarios = [
    {
        expectedValue: true,
        name         : `returns true when player owns any city`,
        state        : {
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
                        ownerId: `player3`,
                    },
                },
            },
            player: {
                name: `player1`,
            },
        },
    },
    {
        expectedValue: false,
        name         : `returns false when player does not own any city`,
        state        : {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    city1: {
                        ...emptyCityState,
                        ownerId: `player2`,
                    },
                    city2: {
                        ...emptyCityState,
                        ownerId: `player3`,
                    },
                    city3: {
                        ...emptyCityState,
                        ownerId: `player4`,
                    },
                },
            },
            player: {
                name: `player1`,
            },
        },
    },
];
