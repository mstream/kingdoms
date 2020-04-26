// @flow


import {
    combineScenarios,
} from '../../../utils';
import {
    execution,
} from './execution';
import {
    scenarios as withValidCredentialsScenarios,
} from './_children/with-valid-credentials';
import type {
    NewGameScenarioContext,
} from '../../types';
import type {
    SignInScenarioContext,
} from './types';
import type {
    TestScenario,
} from '../../../types';

export const scenarios: $ReadOnlyArray< TestScenario< NewGameScenarioContext, SignInScenarioContext > >
    = combineScenarios(
        {
            children: [
                ...withValidCredentialsScenarios,
            ],
            parent: {
                execution,
                path: [
                    `sign in`,
                ],
                tags: [
                    `authentication`,
                ],
            },
        },
    );
