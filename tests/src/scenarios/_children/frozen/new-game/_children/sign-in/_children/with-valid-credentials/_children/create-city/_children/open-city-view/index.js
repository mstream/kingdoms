// @flow

import {
    scenarios as changeCityNameScenarios,
} from './_children/change-city-name';
import {
    scenarios as closeCityViewScenarios,
} from './_children/close-city-view';
import {
    combineScenarios,
} from '../../../../../../../../../../../utils';
import {
    execution,
} from './execution';
import {
    scenarios as navigateToBuildingsTabScenarios,
} from './_children/navigate-to-buildings-tab';
import {
    scenarios as navigateToOrdersTabScenarios,
} from './_children/navigate-to-orders-tab';
import {
    scenarios as navigateToOverviewTabScenarios,
} from './_children/navigate-to-overview-tab';
import {
    scenarios as navigateToResourcesTabScenarios,
} from './_children/navigate-to-resources-tab';
import {
    scenarios as navigateToUnitsTabScenarios,
} from './_children/navigate-to-units-tab';
import type {
    CreateCityScenarioContext,
} from '../../types';
import type {
    TestScenario,
} from '../../../../../../../../../../../types';

export const scenarios: $ReadOnlyArray< TestScenario< CreateCityScenarioContext, CreateCityScenarioContext > >
    = combineScenarios(
        {
            children: [
                ...changeCityNameScenarios,
                ...closeCityViewScenarios,
                ...navigateToBuildingsTabScenarios,
                ...navigateToOrdersTabScenarios,
                ...navigateToOverviewTabScenarios,
                ...navigateToResourcesTabScenarios,
                ...navigateToUnitsTabScenarios,
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
