// @flow


import { emptyCommonState } from '../../../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../../../common/src/state/modules/cities/reducer/state';
import type { ClientStateSelectorTestScenario } from '../../types';
import { emptyClientState } from '../../state';
import type { CityDistances } from '../../../../../../common/src/state/modules/cities/selectors/types';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<?CityDistances>>;

export const distancesToAttackedCitySelectorTestScenarios: Scenarios = [
    {
        name: 'returns null if no city is selected to attack',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                },
            },
        },
        expectedValue: null,
    },
    {
        name: 'returns distances between attacked city and cities owned by player',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: 'city1',
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                        location: {
                            x: 0,
                            y: 0,
                        },
                        ownerId: 'player2',
                    },
                    'city2': {
                        ...emptyCityState,
                        location: {
                            x: 2,
                            y: 0,
                        },
                        ownerId: 'player1',
                    },
                    'city3': {
                        ...emptyCityState,
                        location: {
                            x: 0,
                            y: 1,
                        },
                        ownerId: 'player1',
                    },
                },
            },
        },
        expectedValue: {
            'city1': 0,
            'city2': 2,
            'city3': 1,
        },
    },
];