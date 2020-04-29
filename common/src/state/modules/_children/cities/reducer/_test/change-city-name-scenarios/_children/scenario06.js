// @flow


import {
    changeCityName,
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


export const scenario06: Scenario = {
    action: changeCityName(
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
        cities: {
            city1: {
                ...emptyCityState,
                ownerId: `player1`,
            },
        },
    },
};
