// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';

export const attackingCityIdSelector: ClientStateSelector< ?string, void > = (
    state,
) => {

    return state.menu.attackView.attackingCityId;

};
