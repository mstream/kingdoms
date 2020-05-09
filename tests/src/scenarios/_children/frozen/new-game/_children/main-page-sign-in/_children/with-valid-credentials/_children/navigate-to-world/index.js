// @flow

import {
    scenarios as createCityScenarios,
} from './_children/create-city';
import {
    scenarios as signOutScenarios,
} from './_children/sign-out';

import {
    combineScenarios,
} from '../../../../../../../../../utils';
import {
    execution,
} from './execution';
import type {
    SignInScenarioContext,
} from '../../../../types';
import type {
    TestScenario,
} from '../../../../../../../../../types';


type Scenario = TestScenario< SignInScenarioContext, SignInScenarioContext >;
type Scenarios = $ReadOnlyArray< Scenario >

export const scenarios: Scenarios
    = combineScenarios(
        {
            children: [
                ...createCityScenarios,
                ...signOutScenarios,
            ],
            parent: {
                execution,
                path: [
                    `navigate-to-world`,
                ],
                tags: [
                    `positive`,
                ],
            },
        },
    );
