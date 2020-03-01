/**
 * @flow
 */

import type {ServerCreateCityAction} from '../../../../../common/src/actions';
import type {
    CommonStateCities,
    CommonStateCity,
    ServerState
} from '../../../../../common/src/state';
import {calculateNextCitySpot} from '../../../../../common/src/state';
import type {ServerStateReducerResult} from '../root';
import {failure, success} from '../root';
import {validateCityName} from '../../validators';

export const createCityCitiesReducer = ({action, state}: { action: ServerCreateCityAction, state: ServerState }): ServerStateReducerResult<CommonStateCities> => {
    const {cityId, cityName, playerId} = action.payload;

    const cityValidationErrors = validateCityName({name: cityName});

    if (cityValidationErrors.length > 0) {
        return failure({errors: cityValidationErrors});
    }

    const takenSpots = Object.keys(state.cities).map(cityId => state.cities[cityId].location);

    const freeCitySpot = calculateNextCitySpot({
        minimalCityMargin: state.rules.minimalCityMargin,
        takenSpots,
        worldSize: state.world.size
    });

    if (freeCitySpot == null) {
        return failure({errors: [`there is no space for another city`]});
    }

    const newCity: CommonStateCity = {
        buildings: {
            lumberMill: {
                tier: 0,
            },
            pasture: {
                tier: 0,
            }
        },
        citizens: {
            peasant: 0,
        },
        location: freeCitySpot,
        name: cityName,
        ownerId: playerId,
        resources: {
            food: 0,
            wood: 0,
        },
    };

    const newState = {
        ...state.cities,
        [cityId]: newCity,
    };

    return success({state: newState});
};
