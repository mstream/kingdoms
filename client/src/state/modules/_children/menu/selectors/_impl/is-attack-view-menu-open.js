// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';

export const isAttackViewMenuOpenSelector: ClientStateSelector< boolean, void > = (
    state,
) => {

    return state.menu.attackView.attackedCityId != null;

};
