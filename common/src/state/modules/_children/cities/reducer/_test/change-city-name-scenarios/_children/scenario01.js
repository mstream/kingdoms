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
    success,
} from '../../../../../../utils';
import type {
    Scenario,
} from '../types';

export const scenario01: Scenario = {
    action: changeCityName(
        {
            cityId  : `city1`,
            name    : `Newname`,
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
                        name: `Newname`,
                    },
                },
            },
        );

    },
    name               : `changes the name`,
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
