// @flow


import {
    BUILDING_LUMBER_MILL,
    BUILDING_PASTURE,
    BUILDING_WAREHOUSE,
    RESOURCE_FOOD,
    RESOURCE_WOOD,
    UNIT_ARCHER,
    UNIT_CATAPULT,
    UNIT_KNIGHT,
    UNIT_NOBLE,
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_SWORDSMAN,
} from '../../../../../rules/reducer/types';
import {
    createCity,
} from '../../../../actions';
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
    action: createCity(
        {
            cityId  : `city1`,
            name    : `Name`,
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
                        buildings: {
                            [ BUILDING_LUMBER_MILL ]: {
                                tier: 0,
                            },
                            [ BUILDING_PASTURE ]: {
                                tier: 0,
                            },
                            [ BUILDING_WAREHOUSE ]: {
                                tier: 0,
                            },
                        },
                        location: {
                            x: 0,
                            y: 0,
                        },
                        name     : `Name`,
                        ownerId  : `player1`,
                        resources: {
                            [ RESOURCE_FOOD ]: 0,
                            [ RESOURCE_WOOD ]: 0,
                        },
                        units: {
                            [ UNIT_ARCHER ]   : 0,
                            [ UNIT_CATAPULT ] : 0,
                            [ UNIT_KNIGHT ]   : 0,
                            [ UNIT_NOBLE ]    : 0,
                            [ UNIT_PEASANT ]  : 0,
                            [ UNIT_PIKEMAN ]  : 0,
                            [ UNIT_SWORDSMAN ]: 0,
                        },
                    },
                },
            },
        );

    },
    name               : `creates a city`,
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
