// @flow


import {
    createCity,
} from '../../../../actions';
import {
    emptyCityState,
} from '../../../state';
import {
    emptyCommonState,
} from '../../../../../../state';
import {
    failure,
} from '../../../../../../utils';
import type {
    Scenario,
} from '../types';

export const scenario06: Scenario =  {
    action: createCity(
        {
            cityId  : `city1`,
            name    : `newname`,
            playerId: `player1`,
        },
    ),
    expectedReductionResultCreator: () => {

        return failure(
            {
                errors: [
                    `the city name does not follow the convention`,
                ],
            },
        );

    },
    name               : `fails when the player already owns a city`,
    previousGlobalState: {
        ...emptyCommonState,
        cities: {
            ...emptyCommonState.cities,
            city1: {
                ...emptyCityState,
                location: {
                    x: 0,
                    y: 0,
                },
                ownerId: `player1`,
            },
        },
        rules: {
            ...emptyCommonState.rules,
            minimalCityMargin: {
                x: 2,
                y: 2,
            },
        },
        world: {
            size: {
                x: 5,
                y: 5,
            },
        },
    },
};
