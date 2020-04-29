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

export const scenario04: Scenario = {
    action: createCity(
        {
            cityId  : `city1`,
            name    : `NewnameNewnameNewnameNewnameNewname`,
            playerId: `player1`,
        },
    ),
    expectedReductionResultCreator: () => {

        return failure(
            {
                errors: [
                    `the city name is too long`,
                ],
            },
        );

    },
    name               : `fails when the name is too long`,
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
