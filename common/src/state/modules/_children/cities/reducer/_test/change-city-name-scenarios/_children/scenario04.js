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


export const scenario04: Scenario = {
    action: changeCityName(
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
        cities: {
            city1: {
                ...emptyCityState,
                name   : `Oldname`,
                ownerId: `player1`,
            },
        },
    },
};
