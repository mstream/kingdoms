// @flow

import { resetState } from '../../../../actions';
import { initialCommonState } from '../../../../index';
import { success } from '../../../utils';
import { emptyCommonState } from '../../../state';
import type { CommonResetStateAction } from '../../../../actions/types';
import type { CommonStateWorldReducerTestScenarios } from './types';


export const resetStateTestScenarios: $ReadOnlyArray<CommonStateWorldReducerTestScenarios<CommonResetStateAction>> = [
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
