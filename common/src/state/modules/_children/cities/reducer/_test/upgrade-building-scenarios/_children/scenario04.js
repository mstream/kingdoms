// @flow


import {
    BUILDING_PASTURE,
    RESOURCE_FOOD,
    RESOURCE_WOOD,
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

export const scenario04: Scenario = {
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
                    `insufficient RESOURCE_FOOD`,
                    `insufficient RESOURCE_WOOD`,
                ],
            },
        );

    },
    name               : `fails when the resources are insufficient`,
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
                    [ RESOURCE_FOOD ]: 100,
                    [ RESOURCE_WOOD ]: 100,
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
