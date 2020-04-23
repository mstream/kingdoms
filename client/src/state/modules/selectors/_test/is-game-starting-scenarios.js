// @flow

import {
    emptyCityState,
} from '../../../../../../common/src/state/modules/_children/cities/reducer/state';
import {
    emptyClientState,
} from '../../../state';
import {
    emptyCommonState,
} from '../../../../../../common/src/state/modules/state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< boolean > >;

export const isGameStartingSelectorTestScenarios: Scenarios = [
    {
        expectedValue: true,
        name         :
            `returns true when player is loaded and they do not have any cities`,
        state: {
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
                },
            },
            player: {
                name: `player1`,
            },
        },
    },
    {
        expectedValue: false,
        name         : `returns false when player is not loaded`,
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
                },
            },
            player: {
                name: null,
            },
        },
    },
    {
        expectedValue: false,
        name         : `returns false when player owns cities`,
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
                },
            },
            player: {
                name: `player1`,
            },
        },
    },
];
