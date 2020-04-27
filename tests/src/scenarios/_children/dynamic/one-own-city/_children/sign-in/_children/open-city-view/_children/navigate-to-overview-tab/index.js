// @flow

import {
    combineScenarios,
} from '../../../../../../../../../utils';
import {
    execution,
} from './execution';

import type {
    OneOwnCityScenarioContext,
} from '../../../../../../types';
import type {
    TestScenario,
} from '../../../../../../../../../types';


export const scenarios: $ReadOnlyArray< TestScenario< OneOwnCityScenarioContext, OneOwnCityScenarioContext > >
    = combineScenarios(
        {
            children: [],
            parent  : {
                execution,
                path: [
                    `navigate to orders tab`,
                ],
                tags: [
                    `city-view`,
                    `positive`,
                ],
            },
        },
    );
