// @flow


import {
    abandonCity,
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


export const scenario03: Scenario = {
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
                    `the city does not belong to the player`,
                ],
            },
        );

    },
    name               : `fails when the city does not belong to the player`,
    previousGlobalState: {
        ...emptyCommonState,
        cities: {
            city1: {
                ...emptyCityState,
                ownerId: `player2`,
            },
        },
    },
};
