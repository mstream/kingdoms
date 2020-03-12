// @flow

import type { ServerCreateCityAction } from '../../../../../common/src/actions';
import type { CommonStateReducerResult } from '../root';
import { failure, success } from '../root';
import { validateCityName } from '../../validators';
import type {
    CommonState,
    CommonStateCities,
    CommonStateCity,
} from '../../state';
import { initialCityState } from '../../state';
import { nextCitySpotSelector } from '../../../selectors/common-state';

export const createCityCitiesReducer = (
    {
        action,
        state,
    }:
        {
            action: ServerCreateCityAction,
            state: CommonState
        }): CommonStateReducerResult<CommonStateCities> => {
    const { cityId, cityName, playerId } = action.payload;

    const cityValidationErrors = validateCityName({ name: cityName });

    if (cityValidationErrors.length > 0) {
        return failure({ errors: cityValidationErrors });
    }

    if (Object.keys(state.cities).find(cityId => state.cities[cityId].ownerId === playerId) != null) {
        return failure({ errors: [`player already owns a city`] });
    }


    const freeCitySpot = nextCitySpotSelector(state);

    if (freeCitySpot == null) {
        return failure({ errors: [`there is no space for another city`] });
    }

    const newCity: CommonStateCity = {
        ...initialCityState,
        location: freeCitySpot,
        name: cityName,
        ownerId: playerId,
    };

    const newState = {
        ...state.cities,
        [cityId]: newCity,
    };

    return success({ state: newState });
};
