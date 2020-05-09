// @flow

import {
    combineScenarios,
} from '../../../../../../../../../../../utils';

import {
    execution,
} from './execution';

import type {
    SignInScenarioContext,
} from '../../../../../../types';
import type {
    TestScenario,
} from '../../../../../../../../../../../types';

type Scenario = TestScenario< SignInScenarioContext, SignInScenarioContext >;
type Scenarios = $ReadOnlyArray< Scenario >

export const scenarios: Scenarios
    = combineScenarios(
        {
            children: [],
            parent  : {
                execution,
                path: [
                    `sign out`,
                ],
                tags: [
                    `positive`,
                ],
            },
        },
    );
