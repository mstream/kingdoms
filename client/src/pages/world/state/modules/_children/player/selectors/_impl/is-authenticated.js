// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';

export const isAuthenticatedSelector: ClientStateSelector< boolean, void > = (
    state,
) => {

    return state.player.name != null;

};
