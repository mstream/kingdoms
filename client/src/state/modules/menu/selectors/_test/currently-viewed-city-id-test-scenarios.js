// @flow

import type { ClientStateSelectorTestScenario } from '../../../types';
import { emptyClientState } from '../../../state';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<?string>>

export const currentlyViewedCityIdSelectorTestScenarios: Scenarios = [
    {
        name: 'returns current city id',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                cityView: {
                    ...emptyClientState.menu.cityView,
                    currentCityId: 'city1',
                },
            },
        },
        expectedValue: 'city1',
    },
];
