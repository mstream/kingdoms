// @flow


import {
    combineScenarios,
} from '../../../../../utils';
import {
    execution,
} from './execution';
import {
    scenarios as withInvalidPasswordScenarios,
} from './_children/with-invalid-password';
import {
    scenarios as withNonExistentUsernameScenarios,
} from './_children/with-non-existent-username';
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
} from '../../../../../types';

type Scenario = TestScenario< NewGameScenarioContext, SignInScenarioContext >;
type Scenarios = $ReadOnlyArray< Scenario >

export const scenarios: Scenarios
    = combineScenarios(
        {
            children: [
                ...withInvalidPasswordScenarios,
                ...withNonExistentUsernameScenarios,
                ...withValidCredentialsScenarios,
            ],
            parent: {
                execution,
                path: [
                    `main page sign in`,
                ],
                tags: [
                    `authentication`,
                ],
            },
        },
    );
