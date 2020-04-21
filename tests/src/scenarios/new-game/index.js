// @flow

import {
    combineScenarios,
} from '../utils';
import {
    execution,
} from './execution';
import {
    scenarios as reSignInScenarios,
} from './_children/re-sign-in';
import {
    scenarios as signInScenarios,
} from './_children/sign-in';
import type {
    NewGameScenarioContext,
} from './types';
import type {
    TestScenario,
} from '../types';

export const scenarios: $ReadOnlyArray< TestScenario< {||}, NewGameScenarioContext > >
    = combineScenarios(
        {
            children: [
                ...reSignInScenarios,
                ...signInScenarios,
            ],
            parent: {
                execution,
                path: [
                    `new game`,
                ],
                tags: [
                    `new-game`,
                ],
            },
        },
    );
