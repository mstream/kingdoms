// @flow

import type { CommonStatePlayers } from './types';
import { PLAYER_STATUS_DEFEATED, PLAYER_STATUS_PLAYING } from './types';
import type { CommonStateActionReducer } from '../../types';
import { failure, success } from '../../utils';
import type { CommonResetStateAction } from '../../../actions/types';
import type { CommonCreateCityAction } from '../../cities/actions/types';

type Reducer = CommonStateActionReducer<CommonStatePlayers, CommonCreateCityAction>;

export const createCityPlayersReducer: Reducer = (
    {
        action,
        globalState,
        localState,
    },
) => {
    const { playerId } = action.payload;

    const playerStatus = localState[playerId];

    switch (playerStatus) {
        case PLAYER_STATUS_PLAYING:
            return failure({ errors: ['the player is already playing'] });
        case PLAYER_STATUS_DEFEATED:
            return failure({ errors: ['the player has already been defeated'] });
        default:
            return success({
                state: {
                    ...localState,
                    [playerId]: PLAYER_STATUS_PLAYING,
                },
            });
    }
};


