// @flow

import type { ClientState, ClientStateMenu } from '../../state';
import type { ClientOpenCityViewAction } from '../../actions';
import {
    cityIdsByOwnerSelector,
    playerNameSelector,
    serverStateSelector,
} from '../../selectors/client-state';

export const openCityViewMenuReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientOpenCityViewAction,
            globalState: ClientState,
        },
): ClientStateMenu => {
    if (serverStateSelector(globalState) == null) {
        console.warn(`opening city view without the server state loaded`);
        return localState;
    }

    const playerId = playerNameSelector(globalState);

    if (playerId == null) {
        console.warn(`opening city view for not loaded player`);
        return localState;
    }

    const cityIdsByOwner = cityIdsByOwnerSelector(globalState);
    const playerCityIds = cityIdsByOwner[playerId];

    if (playerCityIds == null) {
        console.warn(`opening city view for player which does not own any city`);
        return localState;
    }

    if (!playerCityIds.includes(action.payload.cityId)) {
        console.warn(`opening city view for player who does not own the city`);
        return localState;
    }

    return {
        ...localState,
        cityView: {
            ...localState.cityView,
            currentCityId: action.payload.cityId,
        },
    };
};
