/**
 * @flow
 */

import type {ServerChangeCityNameAction} from '../../../../../common/src/actions';
import type {
    CommonStateCities,
    CommonStateCity,
    ServerState
} from '../../../../../common/src/state';
import type {ServerStateReducerResult} from '../root';
import {failure, success} from '../root';

export const changeCityNameCitiesReducer = ({action, state}: { action: ServerChangeCityNameAction, state: ServerState }): ServerStateReducerResult<CommonStateCities> => {
    const {cityId, name, playerId} = action.payload;
    const city = state.cities.find(city => city.id === cityId);
    if (city == null) {
        return failure({errors: [`the city does not exist`]});
    }
    if (playerId !== city.ownerId) {
        return failure({errors: [`the city does not belong to the player`]});
    }
    if (name.length < 3) {
        return failure({errors: [`the city name is too short`]});
    }
    if (name.length > 20) {
        return failure({errors: [`the city name is too long`]});
    }
    if (name.match(/^[A-Z][a-z]+$/) == null) {
        return failure({errors: [`the city name does not follow the convention`]});
    }

    const newState = state.cities.map<CommonStateCity>((city) => {
        if (city.id !== action.payload.cityId) {
            return city;
        }
        return {
            ...city,
            name: action.payload.name,
        };
    });

    return success({state: newState});
};
