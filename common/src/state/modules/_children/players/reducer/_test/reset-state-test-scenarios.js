// @flow

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
    CommonStatePlayersReducerTestScenario,
} from './types';

type Scenario = CommonStatePlayersReducerTestScenario< CommonResetStateAction >;
type Scenarios = $ReadOnlyArray< Scenario, >;

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
