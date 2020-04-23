// @flow

import {
    emptyCityState,
} from '../state';
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
    CommonStateCitiesReducerTestScenarios,
} from './types';

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
