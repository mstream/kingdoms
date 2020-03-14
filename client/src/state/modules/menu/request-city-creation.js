// @flow

import type {
    ClientCloseCityViewAction,
    ClientRequestCityCreationAction,
} from '../../actions';
import {
    cityIdsByOwnerSelector,
    playerNameSelector,
    commonStateSelector,
} from '../../selectors';
import type { ClientStateCamera } from '../camera/types';
import type { ClientStateMenu } from './types';
import type { ClientState } from '../root';

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
