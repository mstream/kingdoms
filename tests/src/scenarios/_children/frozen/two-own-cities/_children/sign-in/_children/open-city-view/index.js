// @flow

import {
    combineScenarios,
} from '../../../../../../../utils';
import {
    execution,
} from './execution';
import {
    scenarios as navigateToNextCityScenarios,
} from './_children/navigate-to-next-city';
import {
    scenarios as navigateToPreviousCityScenarios,
} from './_children/navigate-to-previous-city';
import type {
    TestScenario,
} from '../../../../../../../types';
import type {
    TwoOwnCitiesScenarioContext,
} from '../../../../types';

type Scenario = TestScenario< TwoOwnCitiesScenarioContext, TwoOwnCitiesScenarioContext >;
type Scenarios = $ReadOnlyArray< Scenario >

export const scenarios: Scenarios
    = combineScenarios(
        {
            children: [
                ...navigateToNextCityScenarios,
                ...navigateToPreviousCityScenarios,
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
