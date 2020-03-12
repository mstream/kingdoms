// @flow

import type { ServerCreateCityAction } from '../../../../../common/src/actions';
import type { CommonStateReducerResult } from '../root';
import { failure, success } from '../root';
import type {
    CommonState,
    CommonStateCities,
    CommonStateCity,
} from '../../index';
import {
    BUILDING_LUMBER_MILL,
    BUILDING_PASTURE,
    BUILDING_WAREHOUSE,
    RESOURCE_FOOD,
    RESOURCE_WOOD,
    UNIT_ARCHER,
    UNIT_CATAPULT,
    UNIT_KNIGHT,
    UNIT_NOBLE,
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_SWORDMAN,
} from '../../index';
import { nextCitySpotSelector } from '../../../selectors/common-state';
import { validateCityName } from '../../../validators';

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
        buildings: {
            [BUILDING_LUMBER_MILL]: {
                tier: 0,
            },
            [BUILDING_PASTURE]: {
                tier: 0,
            },
            [BUILDING_WAREHOUSE]: {
                tier: 0,
            },
        },
        location: freeCitySpot,
        name: cityName,
        ownerId: playerId,
        resources: {
            [RESOURCE_FOOD]: 0,
            [RESOURCE_WOOD]: 0,
        },
        units: {
            [UNIT_ARCHER]: 0,
            [UNIT_CATAPULT]: 0,
            [UNIT_KNIGHT]: 0,
            [UNIT_NOBLE]: 0,
            [UNIT_PEASANT]: 0,
            [UNIT_PIKEMAN]: 0,
            [UNIT_SWORDMAN]: 0,
        },
    };

    const newState = {
        ...state.cities,
        [cityId]: newCity,
    };

    return success({ state: newState });
};
