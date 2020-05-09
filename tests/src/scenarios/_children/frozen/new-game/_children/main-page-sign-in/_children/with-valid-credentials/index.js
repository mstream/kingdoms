// @flow


import {
    combineScenarios,
} from '../../../../../../../utils';
import {
    execution,
} from './execution';
import {
    scenarios as navigateToWorldScenarios,
} from './_children/navigate-to-world';

import type {
    SignInScenarioContext,
} from '../../types';
import type {
    TestScenario,
} from '../../../../../../../types';

type Scenario = TestScenario< SignInScenarioContext, SignInScenarioContext >;
type Scenarios = $ReadOnlyArray< Scenario >

export const scenarios: Scenarios
    = combineScenarios(
        {
            children: [
                ...navigateToWorldScenarios,
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
