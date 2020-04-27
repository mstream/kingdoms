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

export const scenarios: $ReadOnlyArray< TestScenario< ScenarioContext, ScenarioContext > >
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
