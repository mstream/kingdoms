// @flow

import { emptyClientState } from '../../../../../state';
import type { ClientStateSelectorTestScenario } from '../../../../../types';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<boolean>>;

export const isAttackViewMenuOpenSelectorTestScenarios: Scenarios = [
    {
        name: 'false if attacked city id is null',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: null,
                },
            },
        },
        expectedValue: false,
    },
    {
        name: 'true if attacked city id is not null',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: 'city1',
                },
            },
        },
        expectedValue: true,
    },
];
