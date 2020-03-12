// @flow

import type {ServerChangeCityNameAction} from '../../../../../common/src/actions';
import type {CommonStateReducerResult} from '../root';
import {failure, success} from '../root';
import {validateCityName} from '../../validators';
import type { CommonState, CommonStateCities } from '../../index';

export const changeCityNameCitiesReducer = ({action, state}: { action: ServerChangeCityNameAction, state: CommonState }): CommonStateReducerResult<CommonStateCities> => {
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
