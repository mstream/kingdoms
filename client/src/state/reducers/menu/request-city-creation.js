// @flow

import type {
    ClientState,
    ClientStateCamera,
    ClientStateMenu,
} from '../../state';
import type {
    ClientCloseCityViewAction,
    ClientRequestCityCreationAction,
} from '../../actions';
import {
    cityIdsByOwnerSelector,
    playerNameSelector,
    commonStateSelector,
} from '../../selectors';

export const requestCityCreationMenuReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientRequestCityCreationAction,
            globalState: ClientState,
        },
): ClientStateMenu => {
    return {
        ...localState,
        newCity: {
            ...localState.newCity,
            isCityBeingCreated: true,
        },
    };
};
