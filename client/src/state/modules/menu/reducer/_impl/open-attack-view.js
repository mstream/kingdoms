// @flow


import type { ClientStateMenu } from '../types';
import type { ClientStateActionReducer } from '../../../types';
import type { ClientOpenAttackViewAction } from '../../actions/types';
import { clientStateCommonStateSelectors } from '../../../common-state/selectors';
import { clientStatePlayerSelectors } from '../../../player/selectors';

type Reducer = ClientStateActionReducer<ClientStateMenu, ClientOpenAttackViewAction>;


export const openAttackViewMenuReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    },
) => {
    if (clientStateCommonStateSelectors.isLoaded(globalState) == null) {
        throw Error(`opening city view without the server state loaded`);
    }

    const playerName = clientStatePlayerSelectors.name(globalState);

    if (playerName == null) {
        throw Error(`opening attack view for not loaded player`);
    }

    const cityIdsByOwner = clientStateCommonStateSelectors.cityIdsByOwner(globalState);

    const playerCityIds = cityIdsByOwner != null ? cityIdsByOwner[playerName] : null;

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
