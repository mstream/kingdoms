/**
 * @flow
 */

import type {Vector} from './vector';

export type ChangeInfo = { [string]: number, ... };

export type UpgradeCostInfo = {
    food?: number,
    wood?: number,
};

type Dynamic = {
    changeInfo: ChangeInfo,
    quantity: number,
};

type Upgradeable = {
    tier: number,
    upgradeCostInfo: UpgradeCostInfo,
};

export type CommonStateBuilding = Upgradeable;

export type CommonStateCitizen = Dynamic;

export type CommonStateResource = Dynamic;

export type CommonStateBuildings = {
    lumberMill: CommonStateBuilding,
    pasture: CommonStateBuilding
}

export type CommonStateCitizens = {
    peasant: CommonStateCitizen
}

export type CommonStateResources = {
    food: CommonStateResource,
    wood: CommonStateResource
}

export type ServerStateCity = {
    buildings: CommonStateBuildings,
    citizens: CommonStateCitizens,
    id: string,
    location: Vector,
    name: string,
    ownerId: string,
    resources: CommonStateResources,
};

export type ServerStateCities = $ReadOnlyArray<ServerStateCity>;

export type ServerStateBuildingUpgradeCosts = {
    lumberMill: UpgradeCostInfo,
    pasture: UpgradeCostInfo,
};

export type ServerStateRules = {
    baseCityCapacity: number,
    buildingUpgradeCoefficient: number,
    buildingUpgradeCosts: ServerStateBuildingUpgradeCosts,
    populationGrowthChangeRateCoefficient: number,
    resourceIncreaseChangeRateCoefficient: number,
    unitFoodDemand: number,
    unitStarvingCoefficient: number,
};

export type ServerState = {
    cities: ServerStateCities,
    rules: ServerStateRules,
    time: ?string,
    worldSizeInTiles: Vector,
};
