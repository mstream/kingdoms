// @flow


import {
    combineScenarios,
} from '../../../../../utils';
import {
    execution,
} from './execution';
import {
    scenarios as openCityViewScenarios,
} from './_children/open-city-view';
import type {
    TestScenario,
} from '../../../../../types';
import type {
    TwoOwnCitiesScenarioContext,
} from '../../types';

type Scenario =
    TestScenario< TwoOwnCitiesScenarioContext, TwoOwnCitiesScenarioContext >;

type Scenarios = $ReadOnlyArray< Scenario >

export const scenarios: Scenarios
    = combineScenarios(
        {
            children: [
                ...openCityViewScenarios,
            ],
            parent: {
                execution,
                path: [
                    `sign in`,
                ],
                tags: [
                    `authentication`,
                ],
            },
        },
    );
