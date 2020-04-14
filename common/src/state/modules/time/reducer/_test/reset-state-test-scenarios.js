// @flow

import {
    initialCommonState,
} from '../../../../index';
import {
    success,
} from '../../../utils';
import {
    emptyCommonState,
} from '../../../state';
import type {
    CommonResetStateAction,
} from '../../../../actions/types';
import type {
    CommonStateTimeReducerTestScenarios,
} from './types';
import {
    resetState,
} from '../../../../actions';

type Scenarios = $ReadOnlyArray< CommonStateTimeReducerTestScenarios< CommonResetStateAction >, >;

export const resetStateTestScenarios: Scenarios = [
    {
        action                        : resetState(),
        expectedReductionResultCreator: () => {

            return success(
                {
                    state: initialCommonState.time,
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
