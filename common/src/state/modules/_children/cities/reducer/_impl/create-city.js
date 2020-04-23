// @flow

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
    UNIT_SWORDSMAN,
} from '../../../rules/reducer/types';
import {
    commonStateSelectors,
} from '../../../../selectors';
import {
    failure, success,
} from '../../../../utils';
import {
    validateCityName,
} from '../../../../../../validators';
import type {
    CommonCreateCityAction,
} from '../../actions/types';
import type {
    CommonStateActionReducer,
} from '../../../../types';
import type {
    CommonStateCities, CommonStateCity,
} from '../types';

type Reducer = CommonStateActionReducer< CommonStateCities,
    CommonCreateCityAction, >;

export const createCityCitiesReducer: Reducer = (
    {
        action,
        globalState,
        localState,
    },
) => {

    const {
        cityId, name, playerId,
    } = action.payload;

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

    if (
        Object.keys(
            localState,
        )
            .find(
                (
                    cityId,
                ) => {

                    return localState[ cityId ].ownerId === playerId;

                },
            ) != null
    ) {

        return failure(
            {
                errors: [
                    `player already owns a city`,
                ],
            },
        );

    }

    const freeCitySpot = commonStateSelectors.nextCitySpot(
        globalState,
    );

    if ( freeCitySpot == null ) {

        return failure(
            {
                errors: [
                    `there is no space for another city`,
                ],
            },
        );

    }

    const newCity: CommonStateCity = {
        buildings: {
            [ BUILDING_LUMBER_MILL ]: {
                tier: 0,
            },
            [ BUILDING_PASTURE ]: {
                tier: 0,
            },
            [ BUILDING_WAREHOUSE ]: {
                tier: 0,
            },
        },
        location : freeCitySpot,
        name,
        ownerId  : playerId,
        resources: {
            [ RESOURCE_FOOD ]: 0,
            [ RESOURCE_WOOD ]: 0,
        },
        units: {
            [ UNIT_ARCHER ]   : 0,
            [ UNIT_CATAPULT ] : 0,
            [ UNIT_KNIGHT ]   : 0,
            [ UNIT_NOBLE ]    : 0,
            [ UNIT_PEASANT ]  : 0,
            [ UNIT_PIKEMAN ]  : 0,
            [ UNIT_SWORDSMAN ]: 0,
        },
    };

    const newState = {
        ...localState,
        [ cityId ]: newCity,
    };

    return success(
        {
            state: newState,
        },
    );

};
