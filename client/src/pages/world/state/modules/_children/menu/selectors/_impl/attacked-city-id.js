// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';

export const attackedCityIdSelector: ClientStateSelector< ?string, void > = (
    state,
) => {

    return state.menu.attackView.attackedCityId;

};
