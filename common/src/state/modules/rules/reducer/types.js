// @flow
// @flow-runtime

import { reify, Type } from 'flow-runtime';

export const ARMOR_NONE: 'ARMOR_NONE' = 'ARMOR_NONE';
export const ARMOR_LIGHT: 'ARMOR_LIGHT' = 'ARMOR_LIGHT';
export const ARMOR_MEDIUM: 'ARMOR_MEDIUM' = 'ARMOR_MEDIUM';
export const ARMOR_HEAVY: 'ARMOR_HEAVY' = 'ARMOR_HEAVY';

export const BUILDING_LUMBER_MILL: 'BUILDING_LUMBER_MILL' = 'BUILDING_LUMBER_MILL';
export const BUILDING_PASTURE: 'BUILDING_PASTURE' = 'BUILDING_PASTURE';
export const BUILDING_WAREHOUSE: 'BUILDING_WAREHOUSE' = 'BUILDING_WAREHOUSE';

export const RESOURCE_FOOD: 'RESOURCE_FOOD' = 'RESOURCE_FOOD';
export const RESOURCE_WOOD: 'RESOURCE_WOOD' = 'RESOURCE_WOOD';

export const UNIT_ARCHER: 'UNIT_ARCHER' = 'UNIT_ARCHER';
export const UNIT_CATAPULT: 'UNIT_CATAPULT' = 'UNIT_CATAPULT';
export const UNIT_KNIGHT: 'UNIT_KNIGHT' = 'UNIT_KNIGHT';
export const UNIT_NOBLE: 'UNIT_NOBLE' = 'UNIT_NOBLE';
export const UNIT_PEASANT: 'UNIT_PEASANT' = 'UNIT_PEASANT';
export const UNIT_PIKEMAN: 'UNIT_PIKEMAN' = 'UNIT_PIKEMAN';
export const UNIT_SWORDSMAN: 'UNIT_SWORDSMAN' = 'UNIT_SWORDSMAN';

export type CommonStateArmorKey =
    | typeof ARMOR_NONE
    | typeof ARMOR_LIGHT
    | typeof ARMOR_MEDIUM
    | typeof ARMOR_HEAVY

export type CommonStateBuildingKey =
    | typeof BUILDING_LUMBER_MILL
    | typeof BUILDING_PASTURE
    | typeof BUILDING_WAREHOUSE;

export type CommonStateResourceKey =
    | typeof RESOURCE_FOOD
    | typeof RESOURCE_WOOD

export type CommonStateUnitKey =
    | typeof UNIT_ARCHER
    | typeof UNIT_CATAPULT
    | typeof UNIT_KNIGHT
    | typeof UNIT_NOBLE
    | typeof UNIT_PEASANT
    | typeof UNIT_PIKEMAN
    | typeof UNIT_SWORDSMAN;

export type CommonStateResources = $ReadOnly<{ [CommonStateResourceKey]: number }>;

export type CommonStateBuildingUpgradeCost = $ReadOnly<{ [CommonStateResourceKey]: number }>;

export type CommonStateDamage = $ReadOnly<{ [CommonStateArmorKey]: number }>;

export type CommonStateBuildingUpgradeCosts = $ReadOnly<{ [CommonStateBuildingKey]: CommonStateBuildingUpgradeCost }>;

export type CommonStateUnitStat = $ReadOnly<{
    armor: CommonStateArmorKey,
    damage: CommonStateDamage,
    foodDemand: number,
    range: number,
    speed: number,
}>;

export type CommonStateUnitStats = $ReadOnly<{ [CommonStateUnitKey]: CommonStateUnitStat }>;

export type CommonStateRules = $ReadOnly<{
    baseCityCapacity: number,
    basePeasantsMigrationRate: number,
    buildingUpgradeCoefficient: number,
    buildingUpgradeCosts: CommonStateBuildingUpgradeCosts,
    minimalCityMargin: {
        x: number,
        y: number,
    },
    populationGrowthChangeRateCoefficient: number,
    resourceIncreaseChangeRateCoefficient: number,
    unitFoodDemand: number,
    unitStarvingCoefficient: number,
    unitStats: CommonStateUnitStats,
}>;

export type CommonStateBuilding = $ReadOnly<{
    tier: number,
}>;

export type CommonStateBuildings = $ReadOnly<{ [CommonStateBuildingKey]: CommonStateBuilding }>;

export type CommonStateUnits = $ReadOnly<{ [CommonStateUnitKey]: number }>;

export const CommonStateUnitKeyType = (reify: Type<CommonStateUnitKey>);
