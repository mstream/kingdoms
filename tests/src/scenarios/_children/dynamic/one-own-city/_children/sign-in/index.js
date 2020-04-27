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
    OneOwnCityScenarioContext,
} from '../../types';
import type {
    TestScenario,
} from '../../../../../types';

type Scenario = TestScenario< OneOwnCityScenarioContext, OneOwnCityScenarioContext >;
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
                    `positive`,
                ],
            },
        },
    );
