// @flow

import type { ServerCreateCityAction } from '../../../../../common/src/actions';
import type {
    CommonStateCities,
    CommonStateCity,
    CommonState,
} from '../../../../../common/src/state';
import { calculateNextCitySpot } from '../../../../../common/src/state';
import type { CommonStateReducerResult } from '../root';
import { failure, success } from '../root';
import { validateCityName } from '../../validators';
import { initialCityState } from '../../state';

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

    const takenSpots = Object.keys(state.cities).map(cityId => state.cities[cityId].location);

    const freeCitySpot = calculateNextCitySpot({
        minimalCityMargin: state.rules.minimalCityMargin,
        takenSpots,
        worldSize: state.world.size,
    });

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
