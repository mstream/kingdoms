// @flow

import type { ClientStateSelector } from '../../../../../types';

export const isAttackViewMenuOpenSelector: ClientStateSelector<boolean> = (
    state,
) => {
    return state.menu.attackView.attackedCityId != null;
};
