// @flow

import {
    combineScenarios,
} from '../../utils';
import {
    execution,
} from './execution';
import {
    scenarios as newGameScenarios,
} from './new-game';
import {
    scenarios as twoOwnCitiesScenarios,
} from './two-own-cities';
import type {
    ScenarioContext, TestScenario,
} from '../../types';


export const scenarios: $ReadOnlyArray< TestScenario< ScenarioContext, ScenarioContext > >
    = combineScenarios(
        {
            children: [
                ...newGameScenarios,
                ...twoOwnCitiesScenarios,
            ],
            parent: {
                execution,
                path: [],
                tags: [
                    `frozen`,
                ],
            },
        },
    );
