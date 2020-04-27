// @flow

import {
    combineScenarios,
} from '../../../utils';
import {
    execution,
} from './execution';
import {
    scenarios as signInScenarios,
} from './_children/sign-in';
import type {
    OneOwnCityScenarioContext,
} from './types';
import type {
    ScenarioContext,
    TestScenario,
} from '../../../types';

export const scenarios: $ReadOnlyArray< TestScenario< ScenarioContext, OneOwnCityScenarioContext > >
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
