// @flow

import { emptyClientState } from '../../../../../state';
import type { ClientStateSelectorTestScenario } from '../../../../../types';

type Scenarios = $ReadOnlyArray<ClientStateSelectorTestScenario<boolean>>

export const isNewCityBeingCreatedSelectorTestScenarios: Scenarios = [
    {
        name: 'returns if city is being created',
        state: {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                newCity: {
                    ...emptyClientState.menu.newCity,
                    isCityBeingCreated: true,
                },
            },
        },
        expectedValue: true,
    },
];
