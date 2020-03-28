// @flow

import type { ClientStateMenu } from '../types';
import { clientStatePlayerSelectors } from '../../../player/selectors';
import type { ClientUpdateStateAction } from '../../../common-state/actions/types';
import { clientStateMenuSelectors } from '../../selectors';
import { commonStateCitiesSelectors } from '../../../../../../../../common/src/state/modules/cities/selectors';
import type { ClientStateActionReducer } from '../../../../../types';

type Reducer = ClientStateActionReducer<ClientStateMenu, ClientUpdateStateAction>;


export const updateStateMenuReducer: Reducer = (
    {
        localState,
        action,
        globalState,
    },
) => {
    const playerName = clientStatePlayerSelectors.name(globalState);

    if (playerName == null) {
        return localState;
    }

    const isNewCityBeingCreated = clientStateMenuSelectors.isNewCityBeingCreated(globalState);

    if (isNewCityBeingCreated) {
        return localState;
    }

    const playerCities = commonStateCitiesSelectors.cityIdsByOwner(action.payload.commonState)[playerName];

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
