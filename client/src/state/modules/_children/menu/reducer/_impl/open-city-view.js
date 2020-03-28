// @flow

import type { ClientStateMenu } from '../types';
import type { ClientOpenCityViewAction } from '../../actions/types';
import { clientStateCommonStateSelectors } from '../../../common-state/selectors';
import { clientStatePlayerSelectors } from '../../../player/selectors';
import type { ClientStateActionReducer } from '../../../../../types';

type Reducer = ClientStateActionReducer<ClientStateMenu, ClientOpenCityViewAction>;

export const openCityViewMenuReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    },
) => {
    if (clientStateCommonStateSelectors.isLoaded(globalState) == null) {
        console.warn(`opening city view without the server state loaded`);
        return localState;
    }

    const playerName = clientStatePlayerSelectors.name(globalState);

    if (playerName == null) {
        console.warn(`opening city view for not loaded player`);
        return localState;
    }

    const cityIdsByOwner = clientStateCommonStateSelectors.cityIdsByOwner(globalState);
    const playerCityIds = cityIdsByOwner != null ? cityIdsByOwner[playerName] : null;

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
