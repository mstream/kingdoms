// @flow

import {
    clientStateSelectors,
} from '../../../../selectors';
import type {
    ClientOpenCityViewAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateMenu,
} from '../types';

type Reducer = ClientStateActionReducer< ClientStateMenu,
    ClientOpenCityViewAction, >;

export const openCityViewMenuReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    },
) => {

    if ( !clientStateSelectors.commonState.isLoaded(
        globalState,
    ) ) {

        console.warn(
            `opening city view without the server state loaded`,
        );

        return localState;

    }

    const playerName = clientStateSelectors.player.name(
        globalState,
    );

    if ( playerName == null ) {

        console.warn(
            `opening city view for not loaded player`,
        );

        return localState;

    }

    const cityIdsByOwner = clientStateSelectors.commonState.cityIdsByOwner(
        globalState,
    );

    const playerCityIds
        = cityIdsByOwner == null
            ? null
            : cityIdsByOwner[ playerName ];

    if ( playerCityIds == null ) {

        console.warn(
            `opening city view for player which does not own any city`,
        );

        return localState;

    }

    if ( !playerCityIds.includes(
        action.payload.cityId,
    ) ) {

        console.warn(
            `opening city view for player who does not own the city`,
        );

        return localState;

    }

    return {
        ...localState,
        cityView: {
            ...localState.cityView,
            currentCityId: action.payload.cityId,
            orderId      : null,
        },
    };

};
