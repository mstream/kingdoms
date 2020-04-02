// @flow

import { initialCommonState } from '../../../../index';
import { success } from '../../../utils';
import { emptyCommonState } from '../../../state';
import type { CommonResetStateAction } from '../../../../actions/types';
import type { CommonStateOrdersReducerTestScenarios } from './types';
import { resetState } from '../../../../actions';

type Scenarios = $ReadOnlyArray<
    CommonStateOrdersReducerTestScenarios<CommonResetStateAction>,
>;

export const resetStateTestScenarios: Scenarios = [
    {
        name: 'resets its state',
        action: resetState(),
        previousGlobalState: {
            ...emptyCommonState,
            time: emptyCommonState.time,
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return success({
                state: initialCommonState.orders,
            });
        },
    },
];
