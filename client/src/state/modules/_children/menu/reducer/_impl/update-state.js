// @flow

import {
    clientStateSelectors,
} from '../../../../selectors';
import {
    commonStateCitiesSelectors,
} from '../../../../../../../../common/src/state/modules/_children/cities/selectors';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateMenu,
} from '../types';
import type {
    ClientUpdateStateAction,
} from '../../../common-state/actions/types';

type Reducer = ClientStateActionReducer< ClientStateMenu,
    ClientUpdateStateAction, >;

export const updateStateMenuReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    },
) => {

    const playerName = clientStateSelectors.player.name(
        globalState,
    );

    if ( playerName == null ) {

        return localState;

    }

    const isNewCityBeingCreated = clientStateSelectors.menu.isNewCityBeingCreated(
        globalState,
    );

    if ( isNewCityBeingCreated ) {

        return localState;

    }

    const playerCities = commonStateCitiesSelectors.cityIdsByOwner(
        action.payload.commonState,
    )[ playerName ];

    if ( playerCities == null || playerCities.length === 0 ) {

        return localState;

    }

    return {
        ...localState,
        newCity: {
            ...localState.newCity,
            isCityBeingCreated: false,
        },
    };

};
