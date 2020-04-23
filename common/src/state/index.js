// @flow

import {
    ARMOR_HEAVY,
    ARMOR_LIGHT,
    ARMOR_MEDIUM,
    ARMOR_NONE,
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
} from './modules/_children/rules/reducer/types';

import {
    convertQuantitiesToResources,
} from '../resource';
import {
    emptyCitiesState,
} from './modules/_children/cities/reducer/state';
import {
    emptyOrdersState,
} from './modules/_children/orders/reducer/state';
import {
    emptyPlayersState,
} from './modules/_children/players/reducer/state';
import {
    multipleQuantitiesByScalar,
} from '../quantity';
import type {
    CommonState,
} from './modules/types';
import type {
    CommonStateBuildingKey,
    CommonStateBuildings,
    CommonStateResourceKey,
    CommonStateResources,
    CommonStateRules,
} from './modules/_children/rules/reducer/types';
import type {
    CommonStateCity,
} from './modules/_children/cities/reducer/types';
import type {
    Quantities,
} from '../quantity';

export const initialCommonState: CommonState = {
    cities: {
        ...emptyCitiesState,
    },
    orders: {
        ...emptyOrdersState,
    },
    players: {
        ...emptyPlayersState,
    },
    rules: {
        baseCityCapacity          : 1000,
        basePeasantsMigrationRate : 100,
        buildingUpgradeCoefficient: 0.5,
        buildingUpgradeCosts      : {
            [ BUILDING_LUMBER_MILL ]: {
                [ RESOURCE_FOOD ]: 0,
                [ RESOURCE_WOOD ]: 100,
            },
            [ BUILDING_PASTURE ]: {
                [ RESOURCE_FOOD ]: 0,
                [ RESOURCE_WOOD ]: 50,
            },
            [ BUILDING_WAREHOUSE ]: {
                [ RESOURCE_FOOD ]: 0,
                [ RESOURCE_WOOD ]: 200,
            },
        },
        gameSpeed        : 1,
        minimalCityMargin: {
            x: 3,
            y: 3,
        },
        populationGrowthChangeRateCoefficient: 1,
        resourceIncreaseChangeRateCoefficient: 10000,
        unitFoodDemand                       : 1,
        unitStarvingCoefficient              : 0.2,
        unitStats                            : {
            [ UNIT_ARCHER ]: {
                armor : ARMOR_LIGHT,
                damage: {
                    [ ARMOR_HEAVY ] : 0,
                    [ ARMOR_LIGHT ] : 5,
                    [ ARMOR_MEDIUM ]: 1,
                    [ ARMOR_NONE ]  : 10,
                },
                foodDemand: 1,
                range     : 0,
                speed     : 10,
            },
            [ UNIT_CATAPULT ]: {
                armor : ARMOR_HEAVY,
                damage: {
                    [ ARMOR_HEAVY ] : 100,
                    [ ARMOR_LIGHT ] : 100,
                    [ ARMOR_MEDIUM ]: 100,
                    [ ARMOR_NONE ]  : 100,
                },
                foodDemand: 2,
                range     : 0,
                speed     : 1,
            },
            [ UNIT_KNIGHT ]: {
                armor : ARMOR_MEDIUM,
                damage: {
                    [ ARMOR_HEAVY ] : 2,
                    [ ARMOR_LIGHT ] : 10,
                    [ ARMOR_MEDIUM ]: 5,
                    [ ARMOR_NONE ]  : 20,
                },
                foodDemand: 3,
                range     : 0,
                speed     : 50,
            },
            [ UNIT_NOBLE ]: {
                armor : ARMOR_NONE,
                damage: {
                    [ ARMOR_HEAVY ] : 0,
                    [ ARMOR_LIGHT ] : 0,
                    [ ARMOR_MEDIUM ]: 0,
                    [ ARMOR_NONE ]  : 0,
                },
                foodDemand: 100,
                range     : 0,
                speed     : 1,
            },
            [ UNIT_PEASANT ]: {
                armor : ARMOR_NONE,
                damage: {
                    [ ARMOR_HEAVY ] : 0,
                    [ ARMOR_LIGHT ] : 2,
                    [ ARMOR_MEDIUM ]: 1,
                    [ ARMOR_NONE ]  : 4,
                },
                foodDemand: 1,
                range     : 0,
                speed     : 10,
            },
            [ UNIT_PIKEMAN ]: {
                armor : ARMOR_LIGHT,
                damage: {
                    [ ARMOR_HEAVY ] : 1,
                    [ ARMOR_LIGHT ] : 4,
                    [ ARMOR_MEDIUM ]: 2,
                    [ ARMOR_NONE ]  : 8,
                },
                foodDemand: 1,
                range     : 0,
                speed     : 10,
            },
            [ UNIT_SWORDSMAN ]: {
                armor : ARMOR_HEAVY,
                damage: {
                    [ ARMOR_HEAVY ] : 2,
                    [ ARMOR_LIGHT ] : 10,
                    [ ARMOR_MEDIUM ]: 5,
                    [ ARMOR_NONE ]  : 20,
                },
                foodDemand: 1,
                range     : 0,
                speed     : 2,
            },
        },
    },
    time: new Date()
        .toISOString(),
    world: {
        size: {
            x: 10,
            y: 10,
        },
    },
};

export const calculateBuildingTierSum = (
    {
        buildings,
    }: {
        buildings: CommonStateBuildings,
    },
): number => {

    return Object.keys(
        buildings,
    )
        .reduce(
            (
                sum, buildingType,
            ) => {

                return sum + buildings[ buildingType ].tier;

            },
            0,
        );

};

export const calculateBuildingsUpgradeCost = (
    {
        buildingTier,
        buildingType,
        rules,
    }: {
        buildingTier: number,
        buildingType: CommonStateBuildingKey,
        rules: CommonStateRules,
    },
): CommonStateResources => {

    const costFactor = 1 + ( buildingTier * rules.buildingUpgradeCoefficient );

    return convertQuantitiesToResources(
        {
            quantities: multipleQuantitiesByScalar(
                {
                    quantities: rules.buildingUpgradeCosts[ buildingType ],
                    scalar    : costFactor,
                },
            ),
        },
    );

};

const calculateFoodChangeInfo = (
    {
        unitsQuantity,
        pastureTier,
        rules,
    }: {
        unitsQuantity: number,
        pastureTier: number,
        rules: CommonStateRules,
    },
): Quantities => {

    return {
        'pasture production':
            rules.resourceIncreaseChangeRateCoefficient * pastureTier,
        'peasants production': unitsQuantity * rules.unitFoodDemand,
        'units maintenance'  : -unitsQuantity * rules.unitFoodDemand,
    };

};

const calculateWoodChangeInfo = (
    {
        unitsQuantity,
        lumberMillTier,
        rules,
    }: {
        unitsQuantity: number,
        lumberMillTier: number,
        rules: CommonStateRules,
    },
): Quantities => {

    return {
        'lumber mill production':
            rules.resourceIncreaseChangeRateCoefficient * lumberMillTier,
        'peasants production': unitsQuantity,
    };

};

export const calculateResourceChangeInfo = (
    {
        city,
        resourceType,
        rules,
    }: {
        city: CommonStateCity,
        resourceType: CommonStateResourceKey,
        rules: CommonStateRules,
    },
): Quantities => {

    switch ( resourceType ) {

    case RESOURCE_FOOD: {

        return calculateFoodChangeInfo(
            {
                pastureTier  : city.buildings[ BUILDING_PASTURE ].tier,
                rules,
                unitsQuantity: city.units[ UNIT_PEASANT ],
            },
        );

    }

    case RESOURCE_WOOD: {

        return calculateWoodChangeInfo(
            {
                lumberMillTier: city.buildings[ BUILDING_LUMBER_MILL ].tier,
                rules,
                unitsQuantity : city.units[ UNIT_PEASANT ],
            },
        );

    }

    default: {

        throw Error(
            `unsupported resource type: ${ resourceType }`,
        );

    }

    }

};

export const calculatePeasantChangeInfo = (
    {
        buildingTiersSum,
        unitsQuantity,
        food,
        foodChangeRate,
        rules,
    }: {
        buildingTiersSum: number,
        unitsQuantity: number,
        food: number,
        foodChangeRate: number,
        rules: CommonStateRules,
    },
) => {

    const starvingPeopleQuantity
        = food > 0 || foodChangeRate > 0
            ? 0
            : Math.abs(
                foodChangeRate * rules.unitFoodDemand,
            );

    const cityCapacity
        = rules.baseCityCapacity
        + Math.max(
            0,
            ( rules.baseCityCapacity * buildingTiersSum )
            - ( starvingPeopleQuantity * rules.unitStarvingCoefficient ),
        );

    const growthFactorRate
        = rules.populationGrowthChangeRateCoefficient
        * unitsQuantity
        * ( 1 - ( unitsQuantity / cityCapacity ) );

    const percentageOfPeopleStarving
        = unitsQuantity === 0
            ? 0
            : starvingPeopleQuantity / unitsQuantity;

    const migrationRate
        = starvingPeopleQuantity > 0
            ? -rules.basePeasantsMigrationRate * percentageOfPeopleStarving
            : rules.basePeasantsMigrationRate;
    return {
        growth   : growthFactorRate,
        migration: migrationRate,
    };

};

export const convertChangeInfoToChangeRate = (
    {
        changeInfo,
    }: {
        changeInfo: Quantities,
    },
): number => {

    return Object.keys(
        changeInfo,
    )
        .map(
            (
                changeType,
            ) => {

                return changeInfo[ changeType ];

            },
        )
        .reduce(
            (
                changeRate, partialChangeRate,
            ) => {

                return changeRate + partialChangeRate;

            },
            0,
        );

};

export const convertChangeRateToDelta = (
    {
        changeRate,
        timeDelta,
    }: {
        changeRate: number,
        timeDelta: number,
    },
): number => {

    return ( changeRate / 3600 ) * timeDelta;

};
