// @flow


import type { ClientStateMenu } from '../types';
import type { ClientStateActionReducer } from '../../../types';
import type { ClientRequestCityCreationAction } from '../../../common-state/actions/types';

type Reducer = ClientStateActionReducer<ClientStateMenu, ClientRequestCityCreationAction>;

export const requestCityCreationMenuReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    },
) => {
    return {
        ...localState,
        newCity: {
            ...localState.newCity,
            isCityBeingCreated: true,
        },
    };
};
