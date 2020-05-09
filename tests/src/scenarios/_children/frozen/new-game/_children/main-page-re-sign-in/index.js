// @flow


import {
    combineScenarios,
} from '../../../../../utils';
import {
    execution,
} from './execution';
import {
    scenarios as withTokenWithInvalidSignatureScenarios,
} from './_children/with-token-with-invalid-signature';
import {
    scenarios as withTokenWithoutUsernameScenarios,
} from './_children/with-token-without-username';
import {
    scenarios as withUnparseableTokenScenarios,
} from './_children/with-unparseable-token';
import type {
    NewGameScenarioContext,
} from '../../types';
import type {

    TestScenario,
} from '../../../../../types';

type Scenario = TestScenario< NewGameScenarioContext, NewGameScenarioContext >;
type Scenarios = $ReadOnlyArray< Scenario >

export const scenarios: Scenarios
    = combineScenarios(
        {
            children: [
                ...withTokenWithInvalidSignatureScenarios,
                ...withTokenWithoutUsernameScenarios,
                ...withUnparseableTokenScenarios,
            ],
            parent: {
                execution,
                path: [
                    `main page re-sign in`,
                ],
                tags: [
                    `authentication`,
                ],
            },
        },
    );
