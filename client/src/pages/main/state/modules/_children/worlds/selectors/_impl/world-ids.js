// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';


export const worldIdsSelector: ClientStateSelector< $ReadOnlyArray< string >, void > = (
    state,
) => {

    return state.worlds.items;

};
