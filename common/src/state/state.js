// @flow
// @flow-runtime

import type { Quantities } from '../quantity';
import { multipleQuantitiesByScalar } from '../quantity';
import { convertQuantitiesToResources } from '../resource';
import type { Vector } from '../vector';
import { addVectors, getDistanceBetweenVectors } from '../vector';
import { reify, Type } from 'flow-runtime';


export const ARMOR_NONE: 'ARMOR_NONE' = 'ARMOR_NONE';
export const ARMOR_LIGHT: 'ARMOR_LIGHT' = 'ARMOR_LIGHT';
export const ARMOR_MEDIUM: 'ARMOR_MEDIUM' = 'ARMOR_MEDIUM';
export const ARMOR_HEAVY: 'ARMOR_HEAVY' = 'ARMOR_HEAVY';

export type ArmorType =
    | typeof ARMOR_NONE
    | typeof ARMOR_LIGHT
    | typeof ARMOR_MEDIUM
    | typeof ARMOR_HEAVY


export const BUILDING_LUMBER_MILL: 'BUILDING_LUMBER_MILL' = 'BUILDING_LUMBER_MILL';
export const BUILDING_PASTURE: 'BUILDING_PASTURE' = 'BUILDING_PASTURE';
export const BUILDING_WAREHOUSE: 'BUILDING_WAREHOUSE' = 'BUILDING_WAREHOUSE';

export type BuildingType =
    | typeof BUILDING_LUMBER_MILL
    | typeof BUILDING_PASTURE
    | typeof BUILDING_WAREHOUSE;


export const RESOURCE_FOOD: 'RESOURCE_FOOD' = 'RESOURCE_FOOD';
export const RESOURCE_WOOD: 'RESOURCE_WOOD' = 'RESOURCE_WOOD';

export type ResourceType =
    | typeof RESOURCE_FOOD
    | typeof RESOURCE_WOOD


export const UNIT_ARCHER: 'UNIT_ARCHER' = 'UNIT_ARCHER';
export const UNIT_CATAPULT: 'UNIT_CATAPULT' = 'UNIT_CATAPULT';
export const UNIT_KNIGHT: 'UNIT_KNIGHT' = 'UNIT_KNIGHT';
export const UNIT_NOBLE: 'UNIT_NOBLE' = 'UNIT_NOBLE';
export const UNIT_PEASANT: 'UNIT_PEASANT' = 'UNIT_PEASANT';
export const UNIT_PIKEMAN: 'UNIT_PIKEMAN' = 'UNIT_PIKEMAN';
export const UNIT_SWORDMAN: 'UNIT_SWORDMAN' = 'UNIT_SWORDMAN';

export type UnitType =
    | typeof UNIT_ARCHER
    | typeof UNIT_CATAPULT
    | typeof UNIT_KNIGHT
    | typeof UNIT_NOBLE
    | typeof UNIT_PEASANT
    | typeof UNIT_PIKEMAN
    | typeof UNIT_SWORDMAN;


export const emptyBuildingState = {
    tier: 0,
};

export type CommonStateBuilding = typeof emptyBuildingState;

export const initialBuildingState: CommonStateBuilding = emptyBuildingState;


export const emptyBuildingsState = {
    [BUILDING_LUMBER_MILL]: emptyBuildingState,
    [BUILDING_PASTURE]: emptyBuildingState,
    [BUILDING_WAREHOUSE]: emptyBuildingState,
};

export type CommonStateBuildings = typeof emptyBuildingsState;


export const emptyUnitsState = {
    [UNIT_ARCHER]: 0,
    [UNIT_CATAPULT]: 0,
    [UNIT_KNIGHT]: 0,
    [UNIT_NOBLE]: 0,
    [UNIT_PEASANT]: 0,
    [UNIT_PIKEMAN]: 0,
    [UNIT_SWORDMAN]: 0,
};

export type CommonStateUnits = typeof emptyUnitsState;

export const initialUnitsState: CommonStateUnits = emptyUnitsState;


export const emptyResourcesState = {
    [RESOURCE_FOOD]: 0,
    [RESOURCE_WOOD]: 0,
};

export type CommonStateResources = typeof emptyResourcesState;

export const initialResourcesState: CommonStateResources = emptyResourcesState;

const emptyCityStateWithoutOptionals = {
    buildings: emptyBuildingsState,
    units: emptyUnitsState,
    location: {
        x: 0,
        y: 0,
    },
    name: '',
    resources: emptyResourcesState,
};

export const emptyCityState = {
    ...emptyCityStateWithoutOptionals,
    ownerId: null,
};

export type CommonStateCity = {
    ...typeof emptyCityStateWithoutOptionals,
    ownerId: ?string,
};

export const initialCityState: CommonStateCity = {
    ...emptyCityState,
};


export const emptyCitiesState: { [string]: CommonStateCity, ... } = Object.freeze({});

export type CommonStateCities = typeof emptyCitiesState

export const initialCitiesState: CommonStateCities = emptyCitiesState;


export const emptyBuildingUpgradeCostState = {
    [RESOURCE_FOOD]: 0,
    [RESOURCE_WOOD]: 0,
};

export type CommonStateBuildingUpgradeCost = typeof emptyBuildingUpgradeCostState;

export const initialBuildingUpgradeCostState: CommonStateBuildingUpgradeCost = emptyBuildingUpgradeCostState;

export const emptyBuildingUpgradeCostsState = {
    [BUILDING_LUMBER_MILL]: emptyBuildingUpgradeCostState,
    [BUILDING_PASTURE]: emptyBuildingUpgradeCostState,
    [BUILDING_WAREHOUSE]: emptyBuildingUpgradeCostState,
};

export type CommonStateBuildingUpgradeCosts = typeof emptyBuildingUpgradeCostsState;

export const initialBuildingUpgradeCosts: CommonStateBuildingUpgradeCosts = {
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
};


export const emptyDamageState = {
    [ARMOR_NONE]: 0,
    [ARMOR_LIGHT]: 0,
    [ARMOR_MEDIUM]: 0,
    [ARMOR_HEAVY]: 0,
};

export type CommonStateDamage = typeof emptyDamageState;

export const initialDamageState: CommonStateDamage = emptyDamageState;


export const emptyUnitStatState = {
    armor: ARMOR_NONE,
    damage: emptyDamageState,
    foodDemand: 0,
    range: 0,
    speed: 0,
};

export type CommonStateUnitStat = typeof emptyUnitStatState;

export const initialUnitStatState: CommonStateUnitStat = emptyUnitStatState;


export const emptyUnitStatsState = {
    [UNIT_ARCHER]: emptyUnitStatState,
    [UNIT_CATAPULT]: emptyUnitStatState,
    [UNIT_KNIGHT]: emptyUnitStatState,
    [UNIT_NOBLE]: emptyUnitStatState,
    [UNIT_PEASANT]: emptyUnitStatState,
    [UNIT_PIKEMAN]: emptyUnitStatState,
    [UNIT_SWORDMAN]: emptyUnitStatState,
};

export type CommonStateUnitStats = typeof emptyUnitStatsState;

export const initialUnitStatsState: CommonStateUnitStats = {
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
            [ARMOR_NONE]: 0,
            [ARMOR_LIGHT]: 0,
            [ARMOR_MEDIUM]: 0,
            [ARMOR_HEAVY]: 0,
        },
        foodDemand: 2,
        range: 0,
        speed: 1,
    },
    [UNIT_KNIGHT]: {
        armor: ARMOR_MEDIUM,
        damage: {
            [ARMOR_NONE]: 0,
            [ARMOR_LIGHT]: 0,
            [ARMOR_MEDIUM]: 0,
            [ARMOR_HEAVY]: 0,
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
            [ARMOR_NONE]: 0,
            [ARMOR_LIGHT]: 0,
            [ARMOR_MEDIUM]: 0,
            [ARMOR_HEAVY]: 0,
        },
        foodDemand: 1,
        range: 0,
        speed: 10,
    },
    [UNIT_PIKEMAN]: {
        armor: ARMOR_LIGHT,
        damage: {
            [ARMOR_NONE]: 0,
            [ARMOR_LIGHT]: 0,
            [ARMOR_MEDIUM]: 0,
            [ARMOR_HEAVY]: 0,
        },
        foodDemand: 1,
        range: 0,
        speed: 10,
    },
    [UNIT_SWORDMAN]: {
        armor: ARMOR_HEAVY,
        damage: {
            [ARMOR_NONE]: 0,
            [ARMOR_LIGHT]: 0,
            [ARMOR_MEDIUM]: 0,
            [ARMOR_HEAVY]: 0,
        },
        foodDemand: 1,
        range: 0,
        speed: 2,
    },
};


export const emptyRulesState = {
    baseCityCapacity: 0,
    basePeasantsMigrationRate: 0,
    buildingUpgradeCoefficient: 0,
    buildingUpgradeCosts: emptyBuildingUpgradeCostsState,
    minimalCityMargin: {
        x: 0,
        y: 0,
    },
    populationGrowthChangeRateCoefficient: 0,
    resourceIncreaseChangeRateCoefficient: 0,
    unitFoodDemand: 0,
    unitStarvingCoefficient: 0,
    unitStats: emptyUnitStatsState,
};

export type CommonStateRules = typeof emptyRulesState;

export const initialRulesState: CommonStateRules = {
    baseCityCapacity: 1000,
    basePeasantsMigrationRate: 100,
    buildingUpgradeCoefficient: 0.5,
    buildingUpgradeCosts: initialBuildingUpgradeCosts,
    minimalCityMargin: {
        x: 3,
        y: 3,
    },
    populationGrowthChangeRateCoefficient: 1,
    resourceIncreaseChangeRateCoefficient: 10000,
    unitFoodDemand: 1,
    unitStarvingCoefficient: 0.2,
    unitStats: initialUnitStatsState,
};


export const emptyTimeState = '';

export type CommonStateTime = typeof emptyTimeState;

export const initialTimeState: CommonStateTime = new Date().toISOString();


export const emptyWorldState = { size: { x: 0, y: 0 } };

export type CommonStateWorld = typeof emptyWorldState;

export const initialWorldState: CommonStateWorld = { size: { x: 10, y: 10 } };


export const emptyCommonState = {
    cities: emptyCitiesState,
    rules: emptyRulesState,
    time: emptyTimeState,
    world: emptyWorldState,
};

export type CommonState = typeof emptyCommonState;

export const initialCommonState: CommonState = {
    cities: initialCitiesState,
    rules: initialRulesState,
    time: initialTimeState,
    world: initialWorldState,
};


export const CommonStateType = (reify: Type<CommonState>);


export const calculateNextCitySpot = ({ minimalCityMargin, takenSpots, worldSize }: { minimalCityMargin: Vector, takenSpots: $ReadOnlyArray<Vector>, worldSize: Vector }): ?Vector => {

    const generateLocationHash = ({ location }: { location: Vector }): string => {
        return `${location.x}_${location.y}`;
    };

    const isSpotValid = ({ location }: { location: Vector }): boolean => {
        for (let yOffset = -minimalCityMargin.y; yOffset <= minimalCityMargin.y; yOffset++) {
            for (let xOffset = -minimalCityMargin.x; xOffset <= minimalCityMargin.x; xOffset++) {
                const offset = { x: xOffset, y: yOffset };
                const neighbouringTileLocation = addVectors({
                    vector1: location,
                    vector2: offset,
                });
                if (neighbouringTileLocation.x < -worldSize.x) {
                    return false;
                }
                if (neighbouringTileLocation.x > worldSize.x) {
                    return false;
                }
                if (neighbouringTileLocation.y < -worldSize.y) {
                    return false;
                }
                if (neighbouringTileLocation.y > worldSize.y) {
                    return false;
                }
                if (allocation[generateLocationHash({ location: neighbouringTileLocation })] === true) {
                    return false;
                }
            }
        }
        return true;
    };

    const allocation = takenSpots.reduce(
        (allocation, location) => {
            return {
                ...allocation,
                [generateLocationHash({ location })]: true,
            };
        },
        {},
    );

    const freeSpots = [];

    for (let y = -worldSize.y; y <= worldSize.y; y++) {
        for (let x = -worldSize.x; x <= worldSize.x; x++) {
            const location = { x, y };
            if (isSpotValid({ location })) {
                freeSpots.push(location);
            }
        }
    }

    freeSpots.sort((freeSpotLocation1, freeSpotLocation2) => getDistanceBetweenVectors({
        vector1: { x: 0, y: 0 },
        vector2: freeSpotLocation1,
    }) - getDistanceBetweenVectors({
        vector1: { x: 0, y: 0 },
        vector2: freeSpotLocation2,
    }));

    return freeSpots.length > 0 ? freeSpots[0] : null;
};


export const calculateBuildingTierSum = ({ buildings }: { buildings: CommonStateBuildings }): number => {
    return Object.keys(buildings).reduce(
        (sum, buildingType) => {
            return sum + buildings[buildingType].tier;
        },
        0,
    );
};


export const calculateBuildingsUpgradeCost = ({ buildingTier, buildingType, rules }: { buildingTier: number, buildingType: string, rules: CommonStateRules }): CommonStateResources => {
    const costFactor = 1 + buildingTier * rules.buildingUpgradeCoefficient;

    return convertQuantitiesToResources({
        quantities: multipleQuantitiesByScalar({
            quantities: rules.buildingUpgradeCosts[buildingType],
            scalar: costFactor,
        }),
    });
};


const calculateFoodChangeInfo = ({ unitsQuantity, pastureTier, rules }: { unitsQuantity: number, pastureTier: number, rules: CommonStateRules }): Quantities => {
    return {
        'units maintenance': -unitsQuantity * rules.unitFoodDemand,
        'pasture production': rules.resourceIncreaseChangeRateCoefficient * pastureTier,
        'peasants production': unitsQuantity * rules.unitFoodDemand,
    };
};


const calculateWoodChangeInfo = ({ unitsQuantity, lumberMillTier, rules }: { unitsQuantity: number, lumberMillTier: number, rules: CommonStateRules }): Quantities => {
    return {
        'lumber mill production': rules.resourceIncreaseChangeRateCoefficient * lumberMillTier,
        'peasants production': unitsQuantity,
    };
};


export const calculateResourceChangeInfo = ({ city, resourceType, rules }: { city: CommonStateCity, resourceType: string, rules: CommonStateRules }): Quantities => {
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


export const calculatePeasantChangeInfo = ({ buildingTiersSum, unitsQuantity, food, foodChangeRate, rules }: { buildingTiersSum: number, unitsQuantity: number, food: number, foodChangeRate: number, rules: CommonStateRules }) => {
    const starvingPeopleQuantity = food > 0 || foodChangeRate > 0 ? 0 : Math.abs(foodChangeRate * rules.unitFoodDemand);
    const cityCapacity = rules.baseCityCapacity + Math.max(0, rules.baseCityCapacity * buildingTiersSum - starvingPeopleQuantity * rules.unitStarvingCoefficient);
    const growthFactorRate = rules.populationGrowthChangeRateCoefficient * unitsQuantity * (1 - (unitsQuantity / cityCapacity));
    const percentageOfPeopleStarving = unitsQuantity === 0 ? 0 : starvingPeopleQuantity / unitsQuantity;
    const migrationRate = starvingPeopleQuantity > 0 ? -rules.basePeasantsMigrationRate * percentageOfPeopleStarving : rules.basePeasantsMigrationRate;
    return {
        'growth': growthFactorRate,
        'migration': migrationRate,
    };
};


export const convertChangeInfoToChangeRate = ({ changeInfo }: { changeInfo: Quantities }): number => {
    return Object
        .keys(changeInfo)
        .map(changeType => changeInfo[changeType])
        .reduce(
            (changeRate, partialChangeRate) => {
                return changeRate + partialChangeRate;
            },
            0,
        );
};


export const convertChangeRateToDelta = ({ changeRate, timeDelta }: { changeRate: number, timeDelta: number }): number => {
    return (changeRate / 3600) * timeDelta;
};
