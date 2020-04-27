// @flow


import {
    combineScenarios,
} from '../../../../../../../utils';

import {
    execution,
} from './execution';
import type {
    SignInScenarioContext,
} from '../../types';
import type {
    TestScenario,
} from '../../../../../../../types';

export const scenarios: $ReadOnlyArray< TestScenario< SignInScenarioContext, SignInScenarioContext > >
    = combineScenarios(
        {
            children: [],
            parent  : {
                execution,
                path: [
                    `with non-existent username`,
                ],
                tags: [
                    `negative`,
                ],
            },
        },
    );
