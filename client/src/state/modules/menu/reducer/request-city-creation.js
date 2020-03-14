// @flow


import type { ClientStateMenu } from './types';
import type { ClientState } from '../../root';
import type { ClientRequestCityCreationAction } from '../../common-state/actions';

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
