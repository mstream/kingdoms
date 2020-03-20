// @flow

import { resetState } from '../../../../actions';
import {
    initialCommonState,
} from '../../../../index';
import { success } from '../../../utils';
import { emptyCommonState } from '../../../state';
import { emptyCityState } from '../state';
import type { CommonResetStateAction } from '../../../../actions/types';
import type { CommonStateCitiesReducerTestScenarios } from './types';


export const resetStateTestScenarios: $ReadOnlyArray<CommonStateCitiesReducerTestScenarios<CommonResetStateAction>> = [
    {
        name: 'resets its state',
        action: resetState(),
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                '1': {
                    ...emptyCityState,
                },
            },
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return success(
                {
                    state: initialCommonState.cities,
                },
            );
        },
    },
];
