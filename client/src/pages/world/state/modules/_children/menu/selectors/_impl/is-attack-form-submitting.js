// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';

export const isAttackFormSubmittingSelector: ClientStateSelector< boolean, void > = (
    state,
) => {

    return state.menu.attackView.isSubmitting;

};
