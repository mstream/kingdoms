// @flow

import {
    initialCommonState,
} from '../../../../../index';
import {
    success,
} from '../../../../utils';
import type {
    CommonResetStateAction,
} from '../../../../../actions/types';
import type {
    CommonStateActionReducer,
} from '../../../../types';
import type {
    CommonStatePlayers,
} from '../types';

type Reducer = CommonStateActionReducer< CommonStatePlayers,
    CommonResetStateAction, >;

export const resetStatePlayersReducer: Reducer = () => {

    return success(
        {
            state: initialCommonState.players,
        },
    );

};
