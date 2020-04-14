// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';

export const minimumAttackDelaySelector: ClientStateSelector< number > = (
    state,
) => {

    return state.menu.attackView.minimumDelay;

};
