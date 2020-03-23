// @flow

import { commonStateCityIdsByOwnerSelector } from '../../../../../../common/src/selectors/common-state';
import type { ClientStateMenu } from './types';
import { playerNameSelector } from '../../player/selectors';
import { isCityBeingCreatedSelector } from '../selectors';
import type { ClientStateActionReducer } from '../../types';
import type { ClientUpdateStateAction } from '../../common-state/actions/types';

type Reducer = ClientStateActionReducer<ClientStateMenu, ClientUpdateStateAction>;


export const updateStateMenuReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    },
) => {
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
