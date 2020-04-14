// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';

export const currentlyViewedCityIdSelector: ClientStateSelector< ?string > = (
    state,
) => {

    return state.menu.cityView.currentCityId;

};
