// @flow

import {
    emptyCityState,
} from '../../../../../../common/src/state/modules/cities/reducer/state';
import {
    emptyClientState,
} from '../../../state';
import {
    emptyCommonState,
} from '../../../../../../common/src/state/modules/state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< ?string > >;

export const nextCityIdTestScenarios: Scenarios = [
    {
        expectedValue: null,
        name         : `returns null if player owns only one city`,
        state        : {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    city1: {
                        ...emptyCityState,
                        ownerId: `player1`,
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: `city1`,
                },
            },
            player: {
                name: `player1`,
            },
        },
    },
    {
        expectedValue: `city2`,
        name         : `returns city id of the next city`,
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
                        ownerId: `player1`,
                    },
                    city3: {
                        ...emptyCityState,
                        ownerId: `player1`,
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: `city1`,
                },
            },
            player: {
                name: `player1`,
            },
        },
    },
];
