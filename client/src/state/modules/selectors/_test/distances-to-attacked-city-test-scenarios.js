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
    CityDistances,
} from '../../../../../../common/src/state/modules/_children/cities/selectors/types';
import type {
    ClientStateSelectorTestScenario,
} from '../../../types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< ?CityDistances >, >;

export const distancesToAttackedCitySelectorTestScenarios: Scenarios = [
    {
        expectedValue: null,
        name         : `returns null if no city is selected to attack`,
        state        : {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                },
            },
        },
    },
    {
        expectedValue: {
            city1: 0,
            city2: 2,
            city3: 1,
        },
        name:
            `returns distances between attacked city and cities owned by player`,
        state: {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    city1: {
                        ...emptyCityState,
                        location: {
                            x: 0,
                            y: 0,
                        },
                        ownerId: `player2`,
                    },
                    city2: {
                        ...emptyCityState,
                        location: {
                            x: 2,
                            y: 0,
                        },
                        ownerId: `player1`,
                    },
                    city3: {
                        ...emptyCityState,
                        location: {
                            x: 0,
                            y: 1,
                        },
                        ownerId: `player1`,
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: `city1`,
                },
            },
        },
    },
];
