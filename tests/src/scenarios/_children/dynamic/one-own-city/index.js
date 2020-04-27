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

type Scenario = TestScenario< ScenarioContext, OneOwnCityScenarioContext >;
type Scenarios = $ReadOnlyArray< Scenario >

export const scenarios: Scenarios
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
