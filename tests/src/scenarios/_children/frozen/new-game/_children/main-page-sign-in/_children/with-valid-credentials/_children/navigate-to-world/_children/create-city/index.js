// @flow

import {
    combineScenarios,
} from '../../../../../../../../../../../utils';

import {
    scenarios as openCityViewTestScenarios,
} from './_children/open-city-view';
import type {
    CreateCityScenarioContext,
} from './types';

import {
    execution,
} from './execution';
import type {
    SignInScenarioContext,
} from '../../../../../../types';
import type {
    TestScenario,
} from '../../../../../../../../../../../types';

type Scenario = TestScenario< SignInScenarioContext, CreateCityScenarioContext >;
type Scenarios = $ReadOnlyArray< Scenario >

export const scenarios: Scenarios
    = combineScenarios(
        {
            children: [
                ...openCityViewTestScenarios,
            ],
            parent: {
                execution,
                path: [
                    `create city`,
                ],
                tags: [
                    `positive`,
                ],
            },
        },
    );
