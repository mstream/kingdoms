// @flow


import {
    abandonCity,
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
    action: abandonCity(
        {
            cityId  : `city1`,
            playerId: `player1`,
        },
    ),
    expectedReductionResultCreator: () => {

        return failure(
            {
                errors: [
                    `the city does not exist`,
                ],
            },
        );

    },
    name               : `fails when city does not exist`,
    previousGlobalState: {
        ...emptyCommonState,
        cities: {
        },
    },
};
