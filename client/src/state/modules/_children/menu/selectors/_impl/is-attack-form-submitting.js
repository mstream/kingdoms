// @flow

import type { ClientStateSelector } from '../../../../../types';

export const isAttackFormSubmittingSelector: ClientStateSelector<boolean> = (
    state,
) => {
    return state.menu.attackView.isSubmitting;
};
