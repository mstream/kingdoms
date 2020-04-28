// @flow

import {
    emptyCommonState,
} from '../../../../state';
import {
    emptyRulesState,
} from '../state';
import {
    initialCommonState,
} from '../../../../../index';
import {
    resetState,
} from '../../../../../actions';
import {
    success,
} from '../../../../utils';
import type {
    CommonResetStateAction,
} from '../../../../../actions/types';
import type {
    CommonStateRulesReducerTestScenario,
} from './types';

type Scenario = CommonStateRulesReducerTestScenario< CommonResetStateAction >;
type Scenarios = $ReadOnlyArray< Scenario, >;

export const resetStateTestScenarios: Scenarios = [
    {
        action                        : resetState(),
        expectedReductionResultCreator: () => {

            return success(
                {
                    state: initialCommonState.rules,
                },
            );

        },
        name               : `resets its state`,
        previousGlobalState: {
            ...emptyCommonState,
            rules: {
                ...emptyRulesState,
            },
        },
    },
];
