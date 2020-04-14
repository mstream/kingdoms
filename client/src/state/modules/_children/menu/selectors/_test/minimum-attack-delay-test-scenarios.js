// @flow

import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';

type Scenarios = $ReadOnlyArray< ClientStateSelectorTestScenario< number > >;

export const minimumAttackDelaySelectorTestScenarios: Scenarios = [
    {
        expectedValue: 60,
        name         : `returns the minimum attack delay`,
        state        : {
            ...emptyClientState,
            menu: {
                ...emptyClientState.menu,
                attackView: {
                    ...emptyClientState.menu.attackView,
                    minimumDelay: 60,
                },
            },
        },
    },
];
