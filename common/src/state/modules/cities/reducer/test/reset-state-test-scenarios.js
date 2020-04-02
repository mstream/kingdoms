// @flow

import { initialCommonState } from '../../../../index';
import { success } from '../../../utils';
import { emptyCommonState } from '../../../state';
import { emptyCityState } from '../state';
import type { CommonResetStateAction } from '../../../../actions/types';
import type { CommonStateCitiesReducerTestScenarios } from './types';
import { resetState } from '../../../../actions';

type State = $ReadOnlyArray<
    CommonStateCitiesReducerTestScenarios<CommonResetStateAction>,
>;

export const resetStateTestScenarios: State = [
    {
        name: 'resets its state',
        action: resetState(),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                city1: {
                    ...emptyCityState,
                },
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return success({
                state: initialCommonState.cities,
            });
        },
    },
];
