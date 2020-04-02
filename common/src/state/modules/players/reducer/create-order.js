// @flow

import type { CommonStatePlayers } from './types';
import { PLAYER_STATUS_DEFEATED, PLAYER_STATUS_PLAYING } from './types';
import type {
    CommonState,
    CommonStateActionReducer,
    CommonStateReducerResult,
} from '../../types';
import { failure, success } from '../../utils';
import type { CommonCreateCityAction } from '../../cities/actions/types';
import type { CommonCreateScheduledAttackOrderAction } from '../../orders/actions/types';
import type { CommonResetStateAction } from '../../../actions/types';

type Reducer = CommonStateActionReducer<
    CommonStatePlayers,
    CommonCreateScheduledAttackOrderAction,
>;

export const createOrderPlayersReducer: Reducer = ({
    action,
    globalState,
    localState,
}) => {
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
