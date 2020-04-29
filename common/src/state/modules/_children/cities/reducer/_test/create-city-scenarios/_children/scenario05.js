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

export const scenario05: Scenario = {
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
    name               : `fails when the name does not start with a capital letter`,
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
