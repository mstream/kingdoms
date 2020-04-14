// @flow

import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< ?string > >;

export const attackedCityIdSelectorTestScenarios: Scenarios = [
    {
        expectedValue: `city1`,
        name         : `returns attacked city id`,
        state        : {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    attackedCityId: `city1`,
                },
            },
        },
    },
];
