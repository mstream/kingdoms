// @flow

import type { ClientStateSelector } from '../../../../../types';

export const isNewCityBeingCreatedSelector: ClientStateSelector<boolean> = (
    state,
) => {
    return state.menu.newCity.isCityBeingCreated;
};
