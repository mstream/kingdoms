// @flow

import type { ClientStateSelectorTestScenario } from '../../../types';
import { emptyClientState } from '../../../state';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<?string>>

export const attackingCityIdSelectorTestScenarios: Scenarios = [
    {
        name: 'returns attacking city id',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackingCityId: 'city1',
                },
            },
        },
        expectedValue: 'city1',
    },
];
