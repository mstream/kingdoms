// @flow

import { initialCommonState } from '../../../../index';
import { success } from '../../../utils';
import { emptyCommonState } from '../../../state';
import type { CommonResetStateAction } from '../../../../actions/types';
import type { CommonStatePlayersReducerTestScenario } from './types';
import { resetState } from '../../../../actions';

type Scenarios = $ReadOnlyArray<
    CommonStatePlayersReducerTestScenario<CommonResetStateAction>,
>;

export const resetStateTestScenarios: Scenarios = [
    {
        name: 'resets its state',
        action: resetState(),
        previousGlobalState: {
            ...emptyCommonState,
            players: emptyCommonState.players,
        },
        expectedReductionResultCreator: ({ previousLocalState }) => {
            return success({
                state: initialCommonState.players,
            });
        },
    },
];
