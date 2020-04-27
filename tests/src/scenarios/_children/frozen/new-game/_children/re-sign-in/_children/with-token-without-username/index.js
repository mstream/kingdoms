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

export const scenarios: $ReadOnlyArray< TestScenario< NewGameScenarioContext, NewGameScenarioContext > >
    = combineScenarios(
        {
            children: [],
            parent  : {
                execution,
                path: [
                    `with a token without an username`,
                ],
                tags: [
                    `authentication`,
                ],
            },
        },
    );
