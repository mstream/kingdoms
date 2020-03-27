// @flow


import { emptyCommonState } from '../../../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../../../common/src/state/modules/cities/reducer/state';
import type { ClientStateSelectorTestScenario } from '../../types';
import { emptyClientState } from '../../state';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<?string>>;

export const nextCityIdTestScenarios: Scenarios = [
    {
        name: 'returns null if player owns only one city',
        state: {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: 'city1',
                }
            },
            player: {
                name: 'player1',
            },
        },
        expectedValue: null,
    },
    {
        name: 'returns city id of the next city',
        state: {
            ...emptyClientState,
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                    'city2': {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                    'city3': {
                        ...emptyCityState,
                        ownerId: 'player1',
                    },
                },
            },
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: 'city1',
                }
            },
            player: {
                name: 'player1',
            },
        },
        expectedValue: 'city2',
    },
];