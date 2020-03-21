// @flow

import type { CommonStatePlayers } from './types';
import { PLAYER_STATUS_DEFEATED, PLAYER_STATUS_PLAYING } from './types';
import type { CommonState, CommonStateReducerResult } from '../../types';
import { failure, success } from '../../utils';
import type { CommonCreateCityAction } from '../../cities/actions/types';
import type { CommonCreateOrderAction } from '../../orders/actions/types';

export const createOrderPlayersReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: CommonCreateOrderAction,
        globalState: CommonState,
        localState: CommonStatePlayers,
    },
): CommonStateReducerResult<CommonStatePlayers> => {
    const { playerId } = action.payload;

    const playerStatus = localState[playerId];

    switch (playerStatus) {
        case PLAYER_STATUS_PLAYING:
            return success({ state: localState });
        case PLAYER_STATUS_DEFEATED:
            return failure({ errors: ['the player is not playing'] });
        default:
            return failure({ errors: ['the player is not playing'] });
    }
};


