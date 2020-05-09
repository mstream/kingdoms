// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';

export const isLoadedSelector: ClientStateSelector< boolean, void > = (
    state,
) => {

    return state.commonState != null;

};
