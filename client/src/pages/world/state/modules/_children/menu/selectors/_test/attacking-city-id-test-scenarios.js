// @flow

import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< ?string > >;

export const attackingCityIdSelectorTestScenarios: Scenarios = [
    {
        expectedValue: `city1`,
        name         : `returns attacking city id`,
        state        : {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackingCityId: `city1`,
                },
            },
        },
    },
];
