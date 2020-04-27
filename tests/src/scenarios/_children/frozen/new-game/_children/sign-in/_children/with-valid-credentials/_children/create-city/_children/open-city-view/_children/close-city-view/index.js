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
                    `close city view`,
                ],
                tags: [
                    `city-view`,
                    `positive`,
                ],
            },
        },
    );
