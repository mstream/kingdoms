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

type Scenarios = $ReadOnlyArray< TestScenario< TwoOwnCitiesScenarioContext, TwoOwnCitiesScenarioContext > >;

export const scenarios: Scenarios
    = combineScenarios(
        {
            children: [],
            parent  : {
                execution,
                path: [
                    `navigate to the previous city`,
                ],
                tags: [
                    `positive`,
                ],
            },
        },
    );
