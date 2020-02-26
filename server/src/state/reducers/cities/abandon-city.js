/**
 * @flow
 */

import type {
    ServerAbandonCityAction,
    ServerResetStateAction
} from '../../../../../common/src/actions';
import type {
    CommonStateCities, CommonStateCity,
    ServerState
} from '../../../../../common/src/state';
import type {ServerStateReducerResult} from '../root';
import {failure, success} from '../root';
import {initialState} from '../../state';

export const abandonCityCitiesReducer = ({action, state}: { action: ServerAbandonCityAction, state: ServerState }): ServerStateReducerResult<CommonStateCities> => {
    const {cityId, playerId} = action.payload;
    const city = state.cities.find(city => city.id === cityId);
    if (city == null) {
        return failure({errors: [`the city does not exist`]});
    }
    if (playerId !== city.ownerId) {
        return failure({errors: [`the city does not belong to the player`]});
    }

    const newState = state.cities.map<CommonStateCity>((city) => {
        if (city.id !== action.payload.cityId) {
            return city;
        }
        return {
            ...city,
            ownerId: null,
        };
    });

    return success({state: newState});
};
