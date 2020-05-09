// @flow

import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientStateSelectorTestScenario,
} from '../../../../../types';


type Scenario = ClientStateSelectorTestScenario< $ReadOnlyArray< string > >;
type Scenarios = $ReadOnlyArray< Scenario, >;

export const worldIdsSelectorTestScenarios: Scenarios = [
    {
        expectedValue: [
            `world1`,
            `world2`,
        ],
        name : `returns world ids`,
        state: {
            ...emptyClientState,
            worlds: {
                isLoading: false,
                items    : [
                    `world1`,
                    `world2`,
                ],
            },
        },
    },
];
