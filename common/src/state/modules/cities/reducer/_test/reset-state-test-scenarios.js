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
import {
    emptyCityState,
} from '../state';
import type {
    CommonResetStateAction,
} from '../../../../actions/types';
import type {
    CommonStateCitiesReducerTestScenarios,
} from './types';
import {
    resetState,
} from '../../../../actions';

type State = $ReadOnlyArray< CommonStateCitiesReducerTestScenarios< CommonResetStateAction >, >;

export const resetStateTestScenarios: State = [
    {
        action                        : resetState(),
        expectedReductionResultCreator: () => {

            return success(
                {
                    state: initialCommonState.cities,
                },
            );

        },
        name               : `resets its state`,
        previousGlobalState: {
            ...emptyCommonState,
            cities: {
                city1: {
                    ...emptyCityState,
                },
            },
        },
    },
];
