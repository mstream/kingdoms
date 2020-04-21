// @flow

import {
    scenarios as changeCityNameScenarios,
} from './_children/change-city-name';
import {
    scenarios as closeCityViewScenarios,
} from './_children/close-city-view';
import {
    combineScenarios,
} from '../../../../../../../../../utils';
import {
    execution,
} from './execution';
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
                ...changeCityNameScenarios,
                ...closeCityViewScenarios,
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
