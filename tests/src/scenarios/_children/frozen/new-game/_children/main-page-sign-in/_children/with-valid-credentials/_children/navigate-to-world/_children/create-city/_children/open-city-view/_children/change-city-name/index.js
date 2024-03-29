// @flow

import {
    combineScenarios,
} from '../../../../../../../../../../../../../../../utils';
import {
    execution,
} from './execution';
import type {
    CreateCityScenarioContext,
} from '../../../../types';
import type {
    TestScenario,
} from '../../../../../../../../../../../../../../../types';

type Scenario = TestScenario< CreateCityScenarioContext, CreateCityScenarioContext >;
type Scenarios = $ReadOnlyArray< Scenario >

export const scenarios: Scenarios
    = combineScenarios(
        {
            children: [],
            parent  : {
                execution,
                path: [
                    `change city name`,
                ],
                tags: [
                    `city-view`,
                    `positive`,
                ],
            },
        },
    );
