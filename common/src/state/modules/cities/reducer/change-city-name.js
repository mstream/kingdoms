// @flow

import { validateCityName } from '../../../../validators';
import type { CommonStateCities } from './types';
import type {
    CommonState,
    CommonStateReducerResult,
} from '../../types';
import { failure, success } from '../../utils';
import type { CommonChangeCityNameAction } from '../actions/types';

export const changeCityNameCitiesReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: CommonChangeCityNameAction,
        globalState: CommonState,
        localState: CommonStateCities,
    },
): CommonStateReducerResult<CommonStateCities> => {
    const { cityId, name, playerId } = action.payload;
    const city = localState[cityId];

    if (city == null) {
        return failure({ errors: [`the city does not exist`] });
    }

    if (playerId !== city.ownerId) {
        return failure({ errors: [`the city does not belong to the player`] });
    }

    const cityValidationErrors = validateCityName({ name });

    if (cityValidationErrors.length > 0) {
        return failure({ errors: cityValidationErrors });
    }

    const newCityState = {
        ...city,
        name: action.payload.name,
    };

    const newState = {
        ...localState,
        [cityId]: newCityState,
    };

    return success({ state: newState });
};
