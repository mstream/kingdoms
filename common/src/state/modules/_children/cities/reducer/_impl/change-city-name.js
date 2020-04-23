// @flow

import {
    failure, success,
} from '../../../../utils';
import {
    validateCityName,
} from '../../../../../../validators';
import type {
    CommonChangeCityNameAction,
} from '../../actions/types';
import type {
    CommonStateActionReducer,
} from '../../../../types';
import type {
    CommonStateCities,
} from '../types';

type Reducer = CommonStateActionReducer< CommonStateCities,
    CommonChangeCityNameAction, >;

export const changeCityNameCitiesReducer: Reducer = (
    {
        action,
        localState,
    },
) => {

    const {
        cityId, name, playerId,
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

    const cityValidationErrors = validateCityName(
        {
            name,
        },
    );

    if ( cityValidationErrors.length > 0 ) {

        return failure(
            {
                errors: cityValidationErrors,
            },
        );

    }

    const newCityState = {
        ...city,
        name: action.payload.name,
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
