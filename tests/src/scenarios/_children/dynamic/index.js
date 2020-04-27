// @flow

import {
    combineScenarios,
} from '../../utils';
import {
    execution,
} from './execution';
import {
    scenarios as oneOwnCityScenarios,
} from './one-own-city';
import type {
    ScenarioContext, TestScenario,
} from '../../types';

type Scenario = TestScenario< ScenarioContext, ScenarioContext >;
type Scenarios = $ReadOnlyArray< Scenario >

export const scenarios: Scenarios
    = combineScenarios(
        {
            children: [
                ...oneOwnCityScenarios,
            ],
            parent: {
                execution,
                path: [],
                tags: [
                    `dynamic`,
                ],
            },
        },
    );
