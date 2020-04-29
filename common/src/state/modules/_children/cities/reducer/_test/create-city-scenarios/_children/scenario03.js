// @flow


import {
    createCity,
} from '../../../../actions';
import {
    emptyCommonState,
} from '../../../../../../state';
import {
    failure,
} from '../../../../../../utils';
import type {
    Scenario,
} from '../types';

export const scenario03: Scenario = {
    action: createCity(
        {
            cityId  : `city1`,
            name    : `Ne`,
            playerId: `player1`,
        },
    ),
    expectedReductionResultCreator: () => {

        return failure(
            {
                errors: [
                    `the city name is too short`,
                ],
            },
        );

    },
    name               : `fails when the name is too short`,
    previousGlobalState: {
        ...emptyCommonState,
        rules: {
            ...emptyCommonState.rules,
            minimalCityMargin: {
                x: 2,
                y: 2,
            },
        },
        world: {
            size: {
                x: 2,
                y: 2,
            },
        },
    },
};
