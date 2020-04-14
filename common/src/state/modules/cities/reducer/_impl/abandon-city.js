// @flow

import type {
    CommonStateCities,
} from '../types';
import type {
    CommonStateActionReducer,
} from '../../../types';
import {
    failure, success,
} from '../../../utils';
import type {
    CommonAbandonCityAction,
} from '../../actions/types';

type Reducer = CommonStateActionReducer< CommonStateCities,
    CommonAbandonCityAction, >;

export const abandonCityCitiesReducer: Reducer = (
    {
        action,
        localState,
    },
) => {

    const {
        cityId, playerId,
    } = action.payload;
    const city = localState[ cityId ];

    if ( city == null ) {

        return failure(
            {
                errors: [
                    `the city does not exist`,
                ],
            },
        );

    }

    if ( playerId !== city.ownerId ) {

        return failure(
            {
                errors: [
                    `the city does not belong to the player`,
                ],
            },
        );

    }

    const newCityState = {
        ...city,
        ownerId: null,
    };

    const newState = {
        ...localState,
        [ cityId ]: newCityState,
    };

    return success(
        {
            state: newState,
        },
    );

};
