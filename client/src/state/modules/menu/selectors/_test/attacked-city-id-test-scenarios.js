// @flow

import type { ClientStateSelectorTestScenario } from '../../../types';
import { emptyClientState } from '../../../state';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<?string>>

export const attackedCityIdSelectorTestScenarios: Scenarios = [
    {
        name: 'returns attacked city id',
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
        expectedValue: 'city1',
    },
];
