// @flow


import {
    combineScenarios,
} from '../../../../../../../utils';
import {
    scenarios as createCityScenarios,
} from './_children/create-city';
import {
    scenarios as signOutScenarios,
} from './_children/sign-out';

import {
    execution,
} from './execution';
import type {
    SignInScenarioContext,
} from '../../types';
import type {
    TestScenario,
} from '../../../../../../../types';

export const scenarios: $ReadOnlyArray< TestScenario< SignInScenarioContext, SignInScenarioContext > >
    = combineScenarios(
        {
            children: [
                ...createCityScenarios,
                ...signOutScenarios,
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
