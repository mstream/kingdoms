// @flow

import type {
    ClientStateMenu,
} from '../types';
import type {
    ClientRequestCityCreationAction,
} from '../../../common-state/actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';

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
