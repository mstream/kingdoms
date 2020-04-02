// @flow

import type { ClientActionCreator } from '../../../../types';
import type { ClientLoadPlayerAction } from './types';
import { LOAD_PLAYER } from './types';

const loadPlayer: ClientActionCreator<ClientLoadPlayerAction> = (payload) => {
    return {
        type: LOAD_PLAYER,
        payload,
    };
};

export const playerActions = {
    loadPlayer,
};
