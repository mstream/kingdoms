// @flow


import {
    combineScenarios,
} from '../../../../../utils';
import {
    scenarios as createCityScenarios,
} from './_children/create-city';
import {
    execution,
} from './execution';
import type {
    SignInScenarioContext,
} from '../../types';
import type {
    TestScenario,
} from '../../../../../types';

export const scenarios: $ReadOnlyArray< TestScenario< SignInScenarioContext, SignInScenarioContext > >
    = combineScenarios(
        {
            children: [
                ...createCityScenarios,
            ],
            parent: {
                execution,
                path: [
                    `with valid credentials`,
                ],
                tags: [
                    `positive`,
                ],
            },
        },
    );
