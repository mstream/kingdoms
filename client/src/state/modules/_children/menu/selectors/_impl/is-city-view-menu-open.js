// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';

export const isCityViewMenuOpenSelector: ClientStateSelector< boolean > = (
    state,
) => {

    return state.menu.cityView.currentCityId != null;

};
