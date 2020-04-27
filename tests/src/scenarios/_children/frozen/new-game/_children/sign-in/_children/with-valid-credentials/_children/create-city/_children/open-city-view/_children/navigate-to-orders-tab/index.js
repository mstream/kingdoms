// @flow

import {
    combineScenarios,
} from '../../../../../../../../../../../../../utils';
import {
    execution,
} from './execution';
import type {
    CreateCityScenarioContext,
} from '../../../../types';
import type {
    TestScenario,
} from '../../../../../../../../../../../../../types';


export const scenarios: $ReadOnlyArray< TestScenario< CreateCityScenarioContext, CreateCityScenarioContext > >
    = combineScenarios(
        {
            children: [],
            parent  : {
                execution,
                path: [
                    `navigate to overview tab`,
                ],
                tags: [
                    `city-view`,
                    `positive`,
                ],
            },
        },
    );
