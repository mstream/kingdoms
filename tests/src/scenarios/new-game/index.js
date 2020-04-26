// @flow

import {
    combineScenarios,
} from '../utils';
import {
    execution,
} from './execution';
import {
    scenarios as signInScenarios,
} from './_children/sign-in';
import type {
    NewGameScenarioContext,
} from './types';
import type {
    ScenarioContext,
    TestScenario,
} from '../types';

export const scenarios: $ReadOnlyArray< TestScenario< ScenarioContext, NewGameScenarioContext > >
    = combineScenarios(
        {
            children: [
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
