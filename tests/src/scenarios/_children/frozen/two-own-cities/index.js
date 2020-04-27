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
    ScenarioContext, TestScenario,
} from '../../../types';
import type {
    TwoOwnCitiesScenarioContext,
} from './types';

type Scenario = TestScenario< ScenarioContext, TwoOwnCitiesScenarioContext >;
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
                    `two own cities`,
                ],
                tags: [
                    `two-own-cities`,
                ],
            },
        },
    );
