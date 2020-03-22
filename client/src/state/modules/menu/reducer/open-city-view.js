// @flow

import { cityIdsByOwnerSelector } from '../../../selectors';
import type { ClientStateMenu } from './types';
import { commonStateSelector } from '../../common-state/selectors';
import { playerNameSelector } from '../../player/selectors';
import type { ClientState } from '../../types';
import type { ClientOpenCityViewAction } from '../actions/types';

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
    if (commonStateSelector(globalState) == null) {
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
