// @flow

import {
    PLAYER_STATUS_DEFEATED, PLAYER_STATUS_PLAYING,
} from '../types';
import {
    failure, success,
} from '../../../../utils';
import type {
    CommonCreateCityAction,
} from '../../../cities/actions/types';
import type {
    CommonStateActionReducer,
} from '../../../../types';
import type {
    CommonStatePlayers,
} from '../types';

type Reducer = CommonStateActionReducer< CommonStatePlayers,
    CommonCreateCityAction, >;

export const createCityPlayersReducer: Reducer = (
    {
        action,
        localState,
    },
) => {

    const {
        playerId,
    } = action.payload;

    const playerStatus = localState[ playerId ];

    switch ( playerStatus ) {

    case PLAYER_STATUS_PLAYING:
        return failure(
            {
                errors: [
                    `the player is already playing`,
                ],
            },
        );
    case PLAYER_STATUS_DEFEATED:
        return failure(
            {
                errors: [
                    `the player has already been defeated`,
                ],
            },
        );
    default:
        return success(
            {
                state: {
                    ...localState,
                    [ playerId ]: PLAYER_STATUS_PLAYING,
                },
            },
        );

    }

};
