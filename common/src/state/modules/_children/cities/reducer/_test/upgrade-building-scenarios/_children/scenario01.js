// @flow


import {
    emptyCityState,
} from '../../../state';
import {
    emptyCommonState,
} from '../../../../../../state';
import {
    upgradeBuilding,
} from '../../../../actions';


import {
    BUILDING_PASTURE,
    RESOURCE_FOOD, RESOURCE_WOOD,
} from '../../../../../rules/reducer/types';
import {
    success,
} from '../../../../../../utils';
import type {
    Scenario,
} from '../types';

export const scenario01: Scenario = {
    action: upgradeBuilding(
        {
            buildingType: BUILDING_PASTURE,
            cityId      : `city1`,
            playerId    : `player1`,
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
                        buildings: {
                            ...previousLocalState[ `city1` ].buildings,
                            [ BUILDING_PASTURE ]: {
                                ...previousLocalState[ `city1` ].buildings[
                                    BUILDING_PASTURE
                                ],
                                tier: 1,
                            },
                        },
                        resources: {
                            ...previousLocalState[ `city1` ].resources,
                            [ RESOURCE_FOOD ]: 200,
                            [ RESOURCE_WOOD ]: 100,
                        },
                    },
                },
            },
        );

    },
    name               : `upgrades the building`,
    previousGlobalState: {
        ...emptyCommonState,
        cities: {
            city1: {
                ...emptyCityState,
                buildings: {
                    ...emptyCityState.buildings,
                    [ BUILDING_PASTURE ]: {
                        tier: 0,
                    },
                },
                ownerId  : `player1`,
                resources: {
                    [ RESOURCE_FOOD ]: 400,
                    [ RESOURCE_WOOD ]: 300,
                },
            },
        },
        rules: {
            ...emptyCommonState.rules,
            buildingUpgradeCosts: {
                ...emptyCommonState.rules.buildingUpgradeCosts,
                [ BUILDING_PASTURE ]: {
                    [ RESOURCE_FOOD ]: 200,
                    [ RESOURCE_WOOD ]: 200,
                },
            },
        },
    },
};
