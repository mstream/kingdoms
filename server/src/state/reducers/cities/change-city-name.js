/**
 * @flow
 */

import type {ServerChangeCityNameAction} from '../../../../../common/src/actions';
import type {
    CommonStateCities,
    ServerState
} from '../../../../../common/src/state';
import type {ServerStateReducerResult} from '../root';
import {failure, success} from '../root';
import {validateCityName} from '../../validators';

export const changeCityNameCitiesReducer = ({action, state}: { action: ServerChangeCityNameAction, state: ServerState }): ServerStateReducerResult<CommonStateCities> => {
    const {cityId, name, playerId} = action.payload;
    const city = state.cities[cityId];

    if (city == null) {
        return failure({errors: [`the city does not exist`]});
    }

    if (playerId !== city.ownerId) {
        return failure({errors: [`the city does not belong to the player`]});
    }

    const cityValidationErrors = validateCityName({name});

    if (cityValidationErrors.length > 0) {
        return failure({errors: cityValidationErrors});
    }

    const newCityState = {
        ...city,
        name: action.payload.name,
    };

    const newState = {
        ...state.cities,
        [cityId]: newCityState,
    };

    return success({state: newState});
};
