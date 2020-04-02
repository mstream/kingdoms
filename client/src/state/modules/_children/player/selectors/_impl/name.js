// @flow

import type { ClientStateSelector } from '../../../../../types';

export const nameSelector: ClientStateSelector<?string> = (state) => {
    return state.player.name;
};
