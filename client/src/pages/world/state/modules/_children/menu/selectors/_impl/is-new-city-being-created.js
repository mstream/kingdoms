// @flow

import type {
    ClientStateSelector,
} from '../../../../../types';

export const isNewCityBeingCreatedSelector: ClientStateSelector< boolean, void > = (
    state,
) => {

    return state.menu.newCity.isCityBeingCreated;

};
