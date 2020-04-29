// @flow


import {
    BUILDING_PASTURE,
} from '../../../../../rules/reducer/types';
import {
    emptyCityState,
} from '../../../state';
import {
    emptyCommonState,
} from '../../../../../../state';
import {
    failure,
} from '../../../../../../utils';
import {
    upgradeBuilding,
} from '../../../../actions';
import type {
    Scenario,
} from '../types';

export const scenario03: Scenario = {
    action: upgradeBuilding(
        {
            buildingType: BUILDING_PASTURE,
            cityId      : `city1`,
            playerId    : `player1`,
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
    name               : `fails when city does not belong to the player`,
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
