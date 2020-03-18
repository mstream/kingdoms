// @flow

import type { ClientStatePlayer } from '../reducer/types';
import type { ClientState } from '../../types';

export const playerSelector = (state: ClientState): ClientStatePlayer => {
    return state.player;
};

export const playerNameSelector = (state: ClientState): $PropertyType<ClientStatePlayer, 'name'> => {
    return state.player.name;
};
