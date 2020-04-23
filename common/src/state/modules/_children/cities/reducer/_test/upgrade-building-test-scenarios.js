// @flow

import {
    BUILDING_PASTURE,
    RESOURCE_FOOD,
    RESOURCE_WOOD,
} from '../../../rules/reducer/types';
import {
    emptyCityState,
} from '../state';
import {
    emptyCommonState,
} from '../../../../state';
import {
    failure, success,
} from '../../../../utils';
import {
    upgradeBuilding,
} from '../../actions';
import type {
    CommonStateCitiesReducerTestScenarios,
} from './types';
import type {
    CommonUpgradeBuildingAction,
} from '../../actions/types';

type Scenarios = $ReadOnlyArray< CommonStateCitiesReducerTestScenarios< CommonUpgradeBuildingAction >, >

export const upgradeBuildingTestScenarios: Scenarios = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
];
