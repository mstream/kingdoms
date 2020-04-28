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
    CommonStateWorldReducerTestScenarios,
} from './types';

type Scenario = CommonStateWorldReducerTestScenarios< CommonResetStateAction >;
type Scenarios = $ReadOnlyArray< Scenario >;

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
