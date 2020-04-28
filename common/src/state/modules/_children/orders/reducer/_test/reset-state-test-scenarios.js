// @flow

import {
    emptyCommonState,
} from '../../../../state';
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
    CommonStateOrdersReducerTestScenarios,
} from './types';

type Scenario = CommonStateOrdersReducerTestScenarios< CommonResetStateAction >;
type Scenarios = $ReadOnlyArray< Scenario, >;

export const resetStateTestScenarios: Scenarios = [
    {
        action                        : resetState(),
        expectedReductionResultCreator: () => {

            return success(
                {
                    state: initialCommonState.orders,
                },
            );

        },
        name               : `resets its state`,
        previousGlobalState: {
            ...emptyCommonState,
            time: emptyCommonState.time,
        },
    },
];
