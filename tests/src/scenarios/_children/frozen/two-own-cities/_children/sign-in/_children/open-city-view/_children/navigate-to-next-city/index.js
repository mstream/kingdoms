// @flow

import {
    combineScenarios,
} from '../../../../../../../../../utils';
import {
    execution,
} from './execution';

import type {
    TestScenario,
} from '../../../../../../../../../types';
import type {
    TwoOwnCitiesScenarioContext,
} from '../../../../../../types';


type Scenario = TestScenario< TwoOwnCitiesScenarioContext, TwoOwnCitiesScenarioContext >;
type Scenarios = $ReadOnlyArray< Scenario >

export const scenarios: Scenarios
    = combineScenarios(
        {
            children: [],
            parent  : {
                execution,
                path: [
                    `navigate to the next city`,
                ],
                tags: [
                    `positive`,
                ],
            },
        },
    );
