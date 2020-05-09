// @flow

import {
    LOAD_PLAYER,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../types';
import type {
    ClientLoadPlayerAction,
} from './types';

const loadPlayer: ClientActionCreator< ClientLoadPlayerAction > = (
    payload,
) => {

    return {
        payload,
        type: LOAD_PLAYER,
    };

};

export const playerActions = {
    loadPlayer,
};
