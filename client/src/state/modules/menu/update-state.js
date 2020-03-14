// @flow

import type { ClientUpdateStateAction } from '../../actions';
import {
    isCityBeingCreatedSelector,
    playerNameSelector,
} from '../../selectors';
import { commonStateCityIdsByOwnerSelector } from '../../../../../common/src/selectors/common-state';
import type { ClientStateMenu } from './types';
import type { ClientState } from '../root';

export const updateStateMenuReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientUpdateStateAction,
            globalState: ClientState,
        },
): ClientStateMenu => {
    const playerId = playerNameSelector(globalState);

    if (playerId == null) {
        return localState;
    }

    const isCityBeingCreated = isCityBeingCreatedSelector(globalState);

    if (isCityBeingCreated) {
        return localState;
    }

    const playerCities = commonStateCityIdsByOwnerSelector(action.payload.commonState)[playerId];

    if (playerCities == null || playerCities.length === 0) {
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
