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
    success,
} from '../../../../../../utils';
import type {
    Scenario,
} from '../types';

export const scenario01: Scenario = {
    action: abandonCity(
        {
            cityId  : `city1`,
            playerId: `player1`,
        },
    ),
    expectedReductionResultCreator: (
        {
            previousLocalState,
        },
    ) => {

        return success(
            {
                state: {
                    ...previousLocalState,
                    city1: {
                        ...previousLocalState[ `city1` ],
                        ownerId: null,
                    },
                },
            },
        );

    },
    name               : `abandons city`,
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
