// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';

export const currentlyViewedCityIdSelector: ClientStateSelector< ?string, void > = (
    state,
) => {

    return state.menu.cityView.currentCityId;

};
