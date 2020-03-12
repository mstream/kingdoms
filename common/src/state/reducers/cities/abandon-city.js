// @flow

import type { ServerAbandonCityAction } from '../../../../../common/src/actions';
import type { CommonStateReducerResult } from '../root';
import { failure, success } from '../root';
import type { CommonState, CommonStateCities } from '../../index';

export const abandonCityCitiesReducer = ({ action, state }: { action: ServerAbandonCityAction, state: CommonState }): CommonStateReducerResult<CommonStateCities> => {
    const { cityId, playerId } = action.payload;
    const city = state.cities[cityId];

    if (city == null) {
        return failure({ errors: [`the city does not exist`] });
    }

    if (playerId !== city.ownerId) {
        return failure({ errors: [`the city does not belong to the player`] });
    }

    const newCityState = {
        ...city,
        ownerId: null,
    };

    const newState = {
        ...state.cities,
        [cityId]: newCityState,
    };

    return success({ state: newState });
};
