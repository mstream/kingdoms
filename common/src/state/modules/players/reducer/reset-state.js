// @flow

import { initialCommonState } from '../../../index';
import type { CommonState, CommonStateReducerResult } from '../../types';
import { success } from '../../utils';
import type { CommonResetStateAction } from '../../../actions/types';
import type { CommonStatePlayers } from './types';

export const resetStatePlayersReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: CommonResetStateAction,
        globalState: CommonState,
        localState: CommonStatePlayers,
    },
): CommonStateReducerResult<CommonStatePlayers> => {
    return success({ state: initialCommonState.players });
};
