// @flow

import {
    execution,
} from './execution';

import {
    combineScenarios,
} from './utils';
import {
    scenarios as dynamicScenarios,
} from './_children/dynamic';
import {
    scenarios as frozenScenarios,
} from './_children/frozen';
import type {
    ScenarioContext, TestScenario,
} from './types';

type Scenario = TestScenario< ScenarioContext, ScenarioContext >;
type Scenarios = $ReadOnlyArray< Scenario >

export const scenarios: Scenarios
    = combineScenarios(
        {
            children: [
                ...dynamicScenarios,
                ...frozenScenarios,
            ],
            parent: {
                execution,
                path: [],
                tags: [],
            },
        },
    );
