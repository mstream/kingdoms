// @flow

import type {ServerAbandonCityAction} from '../../../../../common/src/actions';
import type {
    CommonStateCitiesByOwner,
    ServerState
} from '../../../../../common/src/state';
import type {ServerStateReducerResult} from '../root';
import {success} from '../root';

export const abandonCityCitiesByOwnerReducer = ({action, state}: { action: ServerAbandonCityAction, state: ServerState }): ServerStateReducerResult<CommonStateCitiesByOwner> => {
    const {cityId, playerId} = action.payload;

    const playerCities = state.citiesByOwner[playerId];

    const newPlayerCities = playerCities == null ? [] : playerCities.filter(ownedCityId => {
        return ownedCityId !== cityId;
    });

    const newState = {
        ...state.citiesByOwner,
        [playerId]: newPlayerCities,
    };

    return success({state: newState});
};
