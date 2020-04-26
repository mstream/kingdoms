// @flow

import {
    combineScenarios,
} from '../../../../../../../../../utils';
import {
    execution,
} from './execution';
import {
    scenarios as navigateToOverviewTabScenarios,
} from './_children/navigate-to-overview-tab';
import type {
    CreateCityScenarioContext,
} from '../../types';
import type {
    TestScenario,
} from '../../../../../../../../../types';

export const scenarios: $ReadOnlyArray< TestScenario< CreateCityScenarioContext, CreateCityScenarioContext > >
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
