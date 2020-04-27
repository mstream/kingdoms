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

export const scenarios: $ReadOnlyArray< TestScenario< ScenarioContext, ScenarioContext > >
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
