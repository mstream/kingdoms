// @flow

import type { ClientStateSelector } from '../../../../../types';

export const isAuthenticatedSelector: ClientStateSelector<boolean> = (
    state,
) => {
    return state.player.name != null;
};
