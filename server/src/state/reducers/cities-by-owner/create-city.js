// @flow

import type {ServerCreateCityAction} from '../../../../../common/src/actions';
import type {
    CommonStateCitiesByOwner,
    ServerState
} from '../../../../../common/src/state';
import type {ServerStateReducerResult} from '../root';
import {success} from '../root';

export const createCityCitiesByOwnerReducer = ({action, state}: { action: ServerCreateCityAction, state: ServerState }): ServerStateReducerResult<CommonStateCitiesByOwner> => {
    const {cityId, playerId} = action.payload;

    const playerCities = state.citiesByOwner[playerId];

    const newPlayerCities = [...(playerCities == null ? [] : [...playerCities]), cityId];

    const newState = {
        ...state.citiesByOwner,
        [playerId]: newPlayerCities,
    };

    return success({state: newState});
};
