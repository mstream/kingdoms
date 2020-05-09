// @flow

import type {
    ClientRequestCityCreationAction,
} from '../../../common-state/actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateMenu,
} from '../types';

type Reducer = ClientStateActionReducer< ClientStateMenu,
    ClientRequestCityCreationAction, >;

export const requestCityCreationMenuReducer: Reducer = (
    {
        localState,
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
