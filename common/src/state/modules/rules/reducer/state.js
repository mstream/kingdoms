// @flow

import type {
    CommonStateBuilding,
    CommonStateBuildings,
    CommonStateBuildingUpgradeCost,
    CommonStateBuildingUpgradeCosts,
    CommonStateDamage,
    CommonStateResources,
    CommonStateRules,
    CommonStateUnits,
    CommonStateUnitStat,
    CommonStateUnitStats,
} from './types';
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
} from './types';

export const emptyResourcesState: CommonStateResources = {
    [RESOURCE_FOOD]: 0,
    [RESOURCE_WOOD]: 0,
};

export const emptyBuildingUpgradeCostState: CommonStateBuildingUpgradeCost = {
    [RESOURCE_FOOD]: 0,
    [RESOURCE_WOOD]: 0,
};

export const emptyDamageState: CommonStateDamage = {
    [ARMOR_NONE]: 0,
    [ARMOR_LIGHT]: 0,
    [ARMOR_MEDIUM]: 0,
    [ARMOR_HEAVY]: 0,
};

export const emptyBuildingUpgradeCostsState: CommonStateBuildingUpgradeCosts = {
    [BUILDING_LUMBER_MILL]: emptyBuildingUpgradeCostState,
    [BUILDING_PASTURE]: emptyBuildingUpgradeCostState,
    [BUILDING_WAREHOUSE]: emptyBuildingUpgradeCostState,
};

export const emptyUnitStatState: CommonStateUnitStat = {
    armor: ARMOR_NONE,
    damage: emptyDamageState,
    foodDemand: 0,
    range: 0,
    speed: 0,
};

export const emptyUnitStatsState: CommonStateUnitStats = {
    [UNIT_ARCHER]: emptyUnitStatState,
    [UNIT_CATAPULT]: emptyUnitStatState,
    [UNIT_KNIGHT]: emptyUnitStatState,
    [UNIT_NOBLE]: emptyUnitStatState,
    [UNIT_PEASANT]: emptyUnitStatState,
    [UNIT_PIKEMAN]: emptyUnitStatState,
    [UNIT_SWORDSMAN]: emptyUnitStatState,
};

export const emptyRulesState: CommonStateRules = {
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

export const emptyBuildingState: CommonStateBuilding = {
    tier: 0,
};

export const emptyBuildingsState: CommonStateBuildings = {
    [BUILDING_LUMBER_MILL]: emptyBuildingState,
    [BUILDING_PASTURE]: emptyBuildingState,
    [BUILDING_WAREHOUSE]: emptyBuildingState,
};

export const emptyUnitsState: CommonStateUnits = {
    [UNIT_ARCHER]: 0,
    [UNIT_CATAPULT]: 0,
    [UNIT_KNIGHT]: 0,
    [UNIT_NOBLE]: 0,
    [UNIT_PEASANT]: 0,
    [UNIT_PIKEMAN]: 0,
    [UNIT_SWORDSMAN]: 0,
};
