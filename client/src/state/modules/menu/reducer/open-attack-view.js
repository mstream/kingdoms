// @flow

import { cityIdsByOwnerSelector } from '../../../selectors';
import type { ClientStateMenu } from './types';
import { playerNameSelector } from '../../player/selectors';
import { commonStateSelector } from '../../common-state/selectors';
import type { ClientStateActionReducer } from '../../types';
import type { ClientOpenAttackViewAction } from '../actions/types';

type Reducer = ClientStateActionReducer<ClientStateMenu, ClientOpenAttackViewAction>;


export const openAttackViewMenuReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    },
) => {
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
