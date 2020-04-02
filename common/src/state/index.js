// @flow

import type { Quantities } from '../quantity';
import { multipleQuantitiesByScalar } from '../quantity';
import { convertQuantitiesToResources } from '../resource';
import type {
    CommonStateBuildingKey,
    CommonStateBuildings,
    CommonStateResourceKey,
    CommonStateResources,
    CommonStateRules,
} from './modules/rules/reducer/types';
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
} from './modules/rules/reducer/types';
import type { CommonState } from './modules/types';
import type { CommonStateCity } from './modules/cities/reducer/types';
import {
    emptyCitiesState,
    emptyCityState,
} from './modules/cities/reducer/state';
import { emptyOrdersState } from './modules/orders/reducer/state';
import { emptyPlayersState } from './modules/players/reducer/state';
import { PLAYER_STATUS_PLAYING } from './modules/players/reducer/types';

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
        baseCityCapacity: 1000,
        basePeasantsMigrationRate: 100,
        buildingUpgradeCoefficient: 0.5,
        buildingUpgradeCosts: {
            [BUILDING_LUMBER_MILL]: {
                [RESOURCE_FOOD]: 0,
                [RESOURCE_WOOD]: 100,
            },
            [BUILDING_PASTURE]: {
                [RESOURCE_FOOD]: 0,
                [RESOURCE_WOOD]: 50,
            },
            [BUILDING_WAREHOUSE]: {
                [RESOURCE_FOOD]: 0,
                [RESOURCE_WOOD]: 200,
            },
        },
        minimalCityMargin: {
            x: 3,
            y: 3,
        },
        populationGrowthChangeRateCoefficient: 1,
        resourceIncreaseChangeRateCoefficient: 10000,
        unitFoodDemand: 1,
        unitStarvingCoefficient: 0.2,
        unitStats: {
            [UNIT_ARCHER]: {
                armor: ARMOR_LIGHT,
                damage: {
                    [ARMOR_NONE]: 10,
                    [ARMOR_LIGHT]: 5,
                    [ARMOR_MEDIUM]: 1,
                    [ARMOR_HEAVY]: 0,
                },
                foodDemand: 1,
                range: 0,
                speed: 10,
            },
            [UNIT_CATAPULT]: {
                armor: ARMOR_HEAVY,
                damage: {
                    [ARMOR_NONE]: 100,
                    [ARMOR_LIGHT]: 100,
                    [ARMOR_MEDIUM]: 100,
                    [ARMOR_HEAVY]: 100,
                },
                foodDemand: 2,
                range: 0,
                speed: 1,
            },
            [UNIT_KNIGHT]: {
                armor: ARMOR_MEDIUM,
                damage: {
                    [ARMOR_NONE]: 20,
                    [ARMOR_LIGHT]: 10,
                    [ARMOR_MEDIUM]: 5,
                    [ARMOR_HEAVY]: 2,
                },
                foodDemand: 3,
                range: 0,
                speed: 50,
            },
            [UNIT_NOBLE]: {
                armor: ARMOR_NONE,
                damage: {
                    [ARMOR_NONE]: 0,
                    [ARMOR_LIGHT]: 0,
                    [ARMOR_MEDIUM]: 0,
                    [ARMOR_HEAVY]: 0,
                },
                foodDemand: 100,
                range: 0,
                speed: 1,
            },
            [UNIT_PEASANT]: {
                armor: ARMOR_NONE,
                damage: {
                    [ARMOR_NONE]: 4,
                    [ARMOR_LIGHT]: 2,
                    [ARMOR_MEDIUM]: 1,
                    [ARMOR_HEAVY]: 0,
                },
                foodDemand: 1,
                range: 0,
                speed: 10,
            },
            [UNIT_PIKEMAN]: {
                armor: ARMOR_LIGHT,
                damage: {
                    [ARMOR_NONE]: 8,
                    [ARMOR_LIGHT]: 4,
                    [ARMOR_MEDIUM]: 2,
                    [ARMOR_HEAVY]: 1,
                },
                foodDemand: 1,
                range: 0,
                speed: 10,
            },
            [UNIT_SWORDSMAN]: {
                armor: ARMOR_HEAVY,
                damage: {
                    [ARMOR_NONE]: 20,
                    [ARMOR_LIGHT]: 10,
                    [ARMOR_MEDIUM]: 5,
                    [ARMOR_HEAVY]: 2,
                },
                foodDemand: 1,
                range: 0,
                speed: 2,
            },
        },
    },
    time: new Date().toISOString(),
    world: { size: { x: 10, y: 10 } },
};

export const calculateBuildingTierSum = ({
    buildings,
}: {
    buildings: CommonStateBuildings,
}): number => {
    return Object.keys(buildings).reduce((sum, buildingType) => {
        return sum + buildings[buildingType].tier;
    }, 0);
};

export const calculateBuildingsUpgradeCost = ({
    buildingTier,
    buildingType,
    rules,
}: {
    buildingTier: number,
    buildingType: CommonStateBuildingKey,
    rules: CommonStateRules,
}): CommonStateResources => {
    const costFactor = 1 + buildingTier * rules.buildingUpgradeCoefficient;

    return convertQuantitiesToResources({
        quantities: multipleQuantitiesByScalar({
            quantities: rules.buildingUpgradeCosts[buildingType],
            scalar: costFactor,
        }),
    });
};

const calculateFoodChangeInfo = ({
    unitsQuantity,
    pastureTier,
    rules,
}: {
    unitsQuantity: number,
    pastureTier: number,
    rules: CommonStateRules,
}): Quantities => {
    return {
        'units maintenance': -unitsQuantity * rules.unitFoodDemand,
        'pasture production':
            rules.resourceIncreaseChangeRateCoefficient * pastureTier,
        'peasants production': unitsQuantity * rules.unitFoodDemand,
    };
};

const calculateWoodChangeInfo = ({
    unitsQuantity,
    lumberMillTier,
    rules,
}: {
    unitsQuantity: number,
    lumberMillTier: number,
    rules: CommonStateRules,
}): Quantities => {
    return {
        'lumber mill production':
            rules.resourceIncreaseChangeRateCoefficient * lumberMillTier,
        'peasants production': unitsQuantity,
    };
};

export const calculateResourceChangeInfo = ({
    city,
    resourceType,
    rules,
}: {
    city: CommonStateCity,
    resourceType: CommonStateResourceKey,
    rules: CommonStateRules,
}): Quantities => {
    switch (resourceType) {
        case RESOURCE_FOOD: {
            return calculateFoodChangeInfo({
                unitsQuantity: city.units[UNIT_PEASANT],
                pastureTier: city.buildings[BUILDING_PASTURE].tier,
                rules,
            });
        }
        case RESOURCE_WOOD: {
            return calculateWoodChangeInfo({
                unitsQuantity: city.units[UNIT_PEASANT],
                lumberMillTier: city.buildings[BUILDING_LUMBER_MILL].tier,
                rules,
            });
        }
        default: {
            throw Error(`unsupported resource type: ${resourceType}`);
        }
    }
};

export const calculatePeasantChangeInfo = ({
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
}) => {
    const starvingPeopleQuantity =
        food > 0 || foodChangeRate > 0
            ? 0
            : Math.abs(foodChangeRate * rules.unitFoodDemand);
    const cityCapacity =
        rules.baseCityCapacity +
        Math.max(
            0,
            rules.baseCityCapacity * buildingTiersSum -
                starvingPeopleQuantity * rules.unitStarvingCoefficient,
        );
    const growthFactorRate =
        rules.populationGrowthChangeRateCoefficient *
        unitsQuantity *
        (1 - unitsQuantity / cityCapacity);
    const percentageOfPeopleStarving =
        unitsQuantity === 0 ? 0 : starvingPeopleQuantity / unitsQuantity;
    const migrationRate =
        starvingPeopleQuantity > 0
            ? -rules.basePeasantsMigrationRate * percentageOfPeopleStarving
            : rules.basePeasantsMigrationRate;
    return {
        growth: growthFactorRate,
        migration: migrationRate,
    };
};

export const convertChangeInfoToChangeRate = ({
    changeInfo,
}: {
    changeInfo: Quantities,
}): number => {
    return Object.keys(changeInfo)
        .map((changeType) => changeInfo[changeType])
        .reduce((changeRate, partialChangeRate) => {
            return changeRate + partialChangeRate;
        }, 0);
};

export const convertChangeRateToDelta = ({
    changeRate,
    timeDelta,
}: {
    changeRate: number,
    timeDelta: number,
}): number => {
    return (changeRate / 3600) * timeDelta;
};

export const testCommonState: CommonState = {
    cities: {
        '1': {
            ...emptyCityState,
            location: { x: 0, y: 0 },
            name: 'Trzebinia',
            ownerId: 'test1',
            units: {
                ...emptyCityState.units,
                [UNIT_PEASANT]: 1000,
                [UNIT_PIKEMAN]: 100,
            },
        },
        '2': {
            ...emptyCityState,
            location: { x: 3, y: 0 },
            name: 'Krakow',
            ownerId: 'test1',
        },
        '3': {
            ...emptyCityState,
            location: { x: 0, y: -3 },
            name: 'Warszawa',
            ownerId: 'test2',
        },
        '4': {
            ...emptyCityState,
            location: { x: 0, y: 3 },
            name: 'Poznan',
            ownerId: 'test3',
        },
    },
    orders: {
        creationTimes: {},
        items: {
            scheduledAttack: {},
        },
        ownerships: {},
    },
    players: {
        test1: PLAYER_STATUS_PLAYING,
        test2: PLAYER_STATUS_PLAYING,
        test3: PLAYER_STATUS_PLAYING,
    },
    rules: {
        baseCityCapacity: 1000,
        basePeasantsMigrationRate: 100,
        buildingUpgradeCoefficient: 0.5,
        buildingUpgradeCosts: {
            [BUILDING_LUMBER_MILL]: {
                [RESOURCE_FOOD]: 0,
                [RESOURCE_WOOD]: 100,
            },
            [BUILDING_PASTURE]: {
                [RESOURCE_FOOD]: 0,
                [RESOURCE_WOOD]: 50,
            },
            [BUILDING_WAREHOUSE]: {
                [RESOURCE_FOOD]: 0,
                [RESOURCE_WOOD]: 200,
            },
        },
        minimalCityMargin: {
            x: 3,
            y: 3,
        },
        populationGrowthChangeRateCoefficient: 1,
        resourceIncreaseChangeRateCoefficient: 10000,
        unitFoodDemand: 1,
        unitStarvingCoefficient: 0.2,
        unitStats: {
            [UNIT_ARCHER]: {
                armor: ARMOR_LIGHT,
                damage: {
                    [ARMOR_NONE]: 10,
                    [ARMOR_LIGHT]: 5,
                    [ARMOR_MEDIUM]: 1,
                    [ARMOR_HEAVY]: 0,
                },
                foodDemand: 1,
                range: 0,
                speed: 10,
            },
            [UNIT_CATAPULT]: {
                armor: ARMOR_HEAVY,
                damage: {
                    [ARMOR_NONE]: 100,
                    [ARMOR_LIGHT]: 100,
                    [ARMOR_MEDIUM]: 100,
                    [ARMOR_HEAVY]: 100,
                },
                foodDemand: 2,
                range: 0,
                speed: 1,
            },
            [UNIT_KNIGHT]: {
                armor: ARMOR_MEDIUM,
                damage: {
                    [ARMOR_NONE]: 20,
                    [ARMOR_LIGHT]: 10,
                    [ARMOR_MEDIUM]: 5,
                    [ARMOR_HEAVY]: 2,
                },
                foodDemand: 3,
                range: 0,
                speed: 50,
            },
            [UNIT_NOBLE]: {
                armor: ARMOR_NONE,
                damage: {
                    [ARMOR_NONE]: 0,
                    [ARMOR_LIGHT]: 0,
                    [ARMOR_MEDIUM]: 0,
                    [ARMOR_HEAVY]: 0,
                },
                foodDemand: 100,
                range: 0,
                speed: 1,
            },
            [UNIT_PEASANT]: {
                armor: ARMOR_NONE,
                damage: {
                    [ARMOR_NONE]: 4,
                    [ARMOR_LIGHT]: 2,
                    [ARMOR_MEDIUM]: 1,
                    [ARMOR_HEAVY]: 0,
                },
                foodDemand: 1,
                range: 0,
                speed: 10,
            },
            [UNIT_PIKEMAN]: {
                armor: ARMOR_LIGHT,
                damage: {
                    [ARMOR_NONE]: 8,
                    [ARMOR_LIGHT]: 4,
                    [ARMOR_MEDIUM]: 2,
                    [ARMOR_HEAVY]: 1,
                },
                foodDemand: 1,
                range: 0,
                speed: 10,
            },
            [UNIT_SWORDSMAN]: {
                armor: ARMOR_HEAVY,
                damage: {
                    [ARMOR_NONE]: 20,
                    [ARMOR_LIGHT]: 10,
                    [ARMOR_MEDIUM]: 5,
                    [ARMOR_HEAVY]: 2,
                },
                foodDemand: 1,
                range: 0,
                speed: 2,
            },
        },
    },
    time: new Date().toISOString(),
    world: { size: { x: 10, y: 10 } },
};
