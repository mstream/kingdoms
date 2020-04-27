// @flow

import {
    combineScenarios,
} from '../../../../../../../utils';
import {
    execution,
} from './execution';
import {
    scenarios as navigateToOverviewTabScenarios,
} from './_children/navigate-to-overview-tab';

import type {
    OneOwnCityScenarioContext,
} from '../../../../types';
import type {
    TestScenario,
} from '../../../../../../../types';

type Scenario = TestScenario< OneOwnCityScenarioContext, OneOwnCityScenarioContext >;
type Scenarios = $ReadOnlyArray< Scenario >

export const scenarios: Scenarios
    = combineScenarios(
        {
            children: [
                ...navigateToOverviewTabScenarios,
            ],
            parent: {
                execution,
                path: [
                    `open city view`,
                ],
                tags: [
                    `city-view`,
                    `positive`,
                ],
            },
        },
    );
