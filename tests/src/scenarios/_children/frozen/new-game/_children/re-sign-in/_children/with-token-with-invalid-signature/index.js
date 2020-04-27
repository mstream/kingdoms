// @flow


import {
    combineScenarios,
} from '../../../../../../../utils';
import {
    execution,
} from './execution';
import type {
    NewGameScenarioContext,
} from '../../../../types';
import type {

    TestScenario,
} from '../../../../../../../types';

type Scenario = TestScenario< NewGameScenarioContext, NewGameScenarioContext >;
type Scenarios = $ReadOnlyArray< Scenario >

export const scenarios: Scenarios
    = combineScenarios(
        {
            children: [],
            parent  : {
                execution,
                path: [
                    `with a token with invalid signature`,
                ],
                tags: [
                    `authentication`,
                ],
            },
        },
    );
