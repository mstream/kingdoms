// @flow

import { emptyClientState } from '../../../../../state';
import type { ClientStateSelectorTestScenario } from '../../../../../types';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<boolean>>;

export const isAnyMenuOpenSelectorTestScenarios: Scenarios = [
    {
        name: 'false if none open',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: null,
                },
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: null,
                },
            },
        },
        expectedValue: false,
    },
    {
        name: 'true when attack view is open',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: 'city1',
                },
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: null,
                },
            },
        },
        expectedValue: true,
    },
    {
        name: 'true when city view is open',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: null,
                },
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: 'city1',
                },
            },
        },
        expectedValue: true,
    },
];
