// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';

export const isCityViewMenuOpenSelector: ClientStateSelector< boolean, void > = (
    state,
) => {

    return state.menu.cityView.currentCityId != null;

};
