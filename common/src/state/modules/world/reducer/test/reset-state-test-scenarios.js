// @flow

import { initialCommonState } from '../../../../index';
import { success } from '../../../utils';
import { emptyCommonState } from '../../../state';
import type { CommonResetStateAction } from '../../../../actions/types';
import type { CommonStateWorldReducerTestScenarios } from './types';
import { resetState } from '../../../../actions';

type Scenarios = $ReadOnlyArray<CommonStateWorldReducerTestScenarios<CommonResetStateAction>>;

export const resetStateTestScenarios: Scenarios = [
    {
        name: 'resets its state',
        action: resetState(),
        previousGlobalState: {
            ...emptyCommonState,
            world: {
                ...emptyCommonState.world,
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return success(
                {
                    state: initialCommonState.world,
                },
            );
        },
    },
];
