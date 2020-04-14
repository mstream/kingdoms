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
import type {
    CommonResetStateAction,
} from '../../../../actions/types';
import type {
    CommonStatePlayersReducerTestScenario,
} from './types';
import {
    resetState,
} from '../../../../actions';

type Scenarios = $ReadOnlyArray< CommonStatePlayersReducerTestScenario< CommonResetStateAction >, >;

export const resetStateTestScenarios: Scenarios = [
    {
        action                        : resetState(),
        expectedReductionResultCreator: () => {

            return success(
                {
                    state: initialCommonState.players,
                },
            );

        },
        name               : `resets its state`,
        previousGlobalState: {
            ...emptyCommonState,
            players: emptyCommonState.players,
        },
    },
];
