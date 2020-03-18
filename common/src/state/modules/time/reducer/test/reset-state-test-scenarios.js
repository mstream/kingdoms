// @flow

import { resetState } from '../../../../actions';
import { initialCommonState } from '../../../../index';
import { success } from '../../../utils';
import { emptyCommonState } from '../../../state';
import type { CommonResetStateAction } from '../../../../actions/types';
import type { CommonStateTimeReducerTestScenarios } from './types';


export const resetStateTestScenarios: $ReadOnlyArray<CommonStateTimeReducerTestScenarios<CommonResetStateAction>> = [
    {
        name: 'resets its state',
        action: resetState(),
        previousGlobalState: {
            ...emptyCommonState,
            time: emptyCommonState.time,
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return success(
                {
                    state: initialCommonState.time,
                },
            );
        },
    },
];
