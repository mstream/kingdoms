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

export const scenario02: Scenario = {
    action: createCity(
        {
            cityId  : `city1`,
            name    : `Newname`,
            playerId: `player1`,
        },
    ),
    expectedReductionResultCreator: () => {

        return failure(
            {
                errors: [
                    `there is no space for another city`,
                ],
            },
        );

    },
    name               : `fails when there is not enough space for the city`,
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
                x: 1,
                y: 1,
            },
        },
    },
};
