// @flow

import {
    combineScenarios,
} from '../../../../../../../../../utils';

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
} from '../../../../types';
import type {
    TestScenario,
} from '../../../../../../../../../types';


export const scenarios: $ReadOnlyArray< TestScenario< SignInScenarioContext, CreateCityScenarioContext > >
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
