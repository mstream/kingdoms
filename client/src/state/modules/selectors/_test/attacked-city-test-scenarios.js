// @flow


import { emptyCommonState } from '../../../../../../common/src/state/modules/state';
import { emptyCityState } from '../../../../../../common/src/state/modules/cities/reducer/state';
import type { ClientStateSelectorTestScenario } from '../../types';
import { emptyClientState } from '../../state';
import type { CommonStateCity } from '../../../../../../common/src/state/modules/cities/reducer/types';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<?CommonStateCity>>;

export const attackedCitySelectorTestScenarios: Scenarios = [
    {
        name: 'returns null if common state is not loaded',
        state: {
            ...emptyClientState,
            commonState: null,
        },
        expectedValue: null,
    },
    {
        name: 'returns attacked city when common state is loaded',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: 'city2'
                },
            },
            commonState: {
                ...emptyCommonState,
                cities: {
                    'city1': {
                        ...emptyCityState,
                        name: 'Cityone',
                    },
                    'city2': {
                        ...emptyCityState,
                        ownerId: 'Citytwo',
                    },
                },
            },
        },
        expectedValue: {
            ...emptyCityState,
            ownerId: 'Citytwo',
        },
    },
];
