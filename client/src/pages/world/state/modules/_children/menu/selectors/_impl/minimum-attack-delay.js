// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';

export const minimumAttackDelaySelector: ClientStateSelector< number, void > = (
    state,
) => {

    return state.menu.attackView.minimumDelay;

};
