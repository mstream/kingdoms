// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';

export const nameSelector: ClientStateSelector< ?string, void > = (
    state,
) => {

    return state.player.name;

};
