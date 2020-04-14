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
    CommonStateWorldReducerTestScenarios,
} from './types';
import {
    resetState,
} from '../../../../actions';

type Scenarios = $ReadOnlyArray< CommonStateWorldReducerTestScenarios< CommonResetStateAction >, >;

export const resetStateTestScenarios: Scenarios = [
    {
        action                        : resetState(),
        expectedReductionResultCreator: () => {

            return success(
                {
                    state: initialCommonState.world,
                },
            );

        },
        name               : `resets its state`,
        previousGlobalState: {
            ...emptyCommonState,
            world: {
                ...emptyCommonState.world,
            },
        },
    },
];
