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

export const calculateMissingResources = ({available, required}: { available: { [string]: number }, required: { [string]: number } }) => {
    return Object.keys(required).reduce((missingResources, resourceType) => {
            const requiredResourceQuantity = required[resourceType] != null ? required[resourceType] : 0;
            const actualResourceQuantity = available[resourceType] != null ? available[resourceType] : 0;
            const missing = requiredResourceQuantity - actualResourceQuantity;
            return missing > 0 ?
                {
                    ...missingResources,
                    [resourceType]: missing
                } :
                missingResources;
        },
        {}
    );
};