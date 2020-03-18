// @flow

import { resetState } from '../../../../actions';
import { initialCommonState } from '../../../../index';
import { success } from '../../../utils';
import { emptyCommonState } from '../../../state';
import { emptyRulesState } from '../state';
import type { CommonResetStateAction } from '../../../../actions/types';
import type { CommonStateRulesReducerTestScenarios } from './types';


export const resetStateTestScenarios: $ReadOnlyArray<CommonStateRulesReducerTestScenarios<CommonResetStateAction>> = [
    {
        name: 'resets its state',
        action: resetState(),
        previousGlobalState: {
            ...emptyCommonState,
            rules: {
                ...emptyRulesState,
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return success(
                {
                    state: initialCommonState.rules,
                },
            );
        },
    },
];
