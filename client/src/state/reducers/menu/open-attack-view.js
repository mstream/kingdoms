// @flow

import type { ClientState, ClientStateMenu } from '../../state';
import type {
    ClientOpenAttackViewAction,
    ClientOpenCityViewAction,
} from '../../actions';
import {
    cityIdsByOwnerSelector,
    playerNameSelector,
    commonStateSelector,
} from '../../selectors/client-state';

export const openAttackViewMenuReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientOpenAttackViewAction,
            globalState: ClientState,
        },
): ClientStateMenu => {
    if (commonStateSelector(globalState) == null) {
        throw Error(`opening city view without the server state loaded`);
    }

    const playerId = playerNameSelector(globalState);

    if (playerId == null) {
        throw Error(`opening attack view for not loaded player`);
    }

    const cityIdsByOwner = cityIdsByOwnerSelector(globalState);
    const playerCityIds = cityIdsByOwner[playerId];

    if (playerCityIds == null) {
        throw Error(`opening attack view for player which does not own any city`);
    }

    if (playerCityIds.includes(action.payload.cityId)) {
        throw Error(`opening city view for player to whom the city belongs to`);
    }

    return {
        ...localState,
        attackView: {
            ...localState.attackView,
            attackedCityId: action.payload.cityId,
        },
    };
};
