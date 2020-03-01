// @flow
// @flow-runtime

import type {Vector} from './vector';
import {addVectors, getDistanceBetweenVectors} from './vector';
import type {Quantities} from './quantity';
import {multipleQuantitiesByScalar} from './quantity';
import {convertQuantitiesToResources} from './resource';

type Upgradeable = {
    tier: number,
};

export type CommonStateBuilding = Upgradeable;

export type CommonStateCitizen = number;

export type CommonStateResource = number;

export type CommonStateBuildings = {
    lumberMill: CommonStateBuilding,
    pasture: CommonStateBuilding,
}

export type CommonStateCitizens = {
    peasant: CommonStateCitizen
}

export type CommonStateResources = {
    food: CommonStateResource,
    wood: CommonStateResource
}

export type CommonStateCity = {
    buildings: CommonStateBuildings,
    citizens: CommonStateCitizens,
    location: Vector,
    name: string,
    ownerId: ?string,
    resources: CommonStateResources,
    ...
};

export type CommonStateCities = { [string]: CommonStateCity, ... };

export type CommonStateBuildingUpgradeCosts = {
    lumberMill: CommonStateResources,
    pasture: CommonStateResources,
};

export type CommonStateRules = {
    baseCityCapacity: number,
    buildingUpgradeCoefficient: number,
    buildingUpgradeCosts: CommonStateBuildingUpgradeCosts,
    minimalCityMargin: Vector,
    basePeasantsMigrationRate: number,
    populationGrowthChangeRateCoefficient: number,
    resourceIncreaseChangeRateCoefficient: number,
    unitFoodDemand: number,
    unitStarvingCoefficient: number,
};

export type CommonStateTime = string;

export type CommonStateWorld = {
    size: Vector,
};

export type ServerState = {
    cities: CommonStateCities,
    rules: CommonStateRules,
    time: CommonStateTime,
    world: CommonStateWorld,
};

export const calculateNextCitySpot = ({minimalCityMargin, takenSpots, worldSize}: { minimalCityMargin: Vector, takenSpots: $ReadOnlyArray<Vector>, worldSize: Vector }): ?Vector => {

    const generateLocationHash = ({location}: { location: Vector }): string => {
        return `${location.x}_${location.y}`;
    };

    const isSpotValid = ({location}: { location: Vector }): boolean => {
        for (let yOffset = -minimalCityMargin.y; yOffset <= minimalCityMargin.y; yOffset++) {
            for (let xOffset = -minimalCityMargin.x; xOffset <= minimalCityMargin.x; xOffset++) {
                const offset = {x: xOffset, y: yOffset};
                const neighbouringTileLocation = addVectors({
                    vector1: location,
                    vector2: offset
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
                if (allocation[generateLocationHash({location: neighbouringTileLocation})] === true) {
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
                [generateLocationHash({location})]: true
            };
        },
        {}
    );

    const freeSpots = [];

    for (let y = -worldSize.y; y <= worldSize.y; y++) {
        for (let x = -worldSize.x; x <= worldSize.x; x++) {
            const location = {x, y};
            if (isSpotValid({location})) {
                freeSpots.push(location);
            }
        }
    }

    freeSpots.sort((freeSpotLocation1, freeSpotLocation2) => getDistanceBetweenVectors({
        vector1: {x: 0, y: 0},
        vector2: freeSpotLocation1
    }) - getDistanceBetweenVectors({
        vector1: {x: 0, y: 0},
        vector2: freeSpotLocation2
    }));

    return freeSpots.length > 0 ? freeSpots[0] : null;
};

export const calculateBuildingTierSum = ({buildings}: { buildings: CommonStateBuildings }): number => {
    return Object.keys(buildings).reduce(
        (sum, buildingType) => {
            return sum + buildings[buildingType].tier;
        },
        0
    );
};

export const calculateBuildingsUpgradeCost = ({buildingTier, buildingType, rules}: { buildingTier: number, buildingType: string, rules: CommonStateRules }): CommonStateResources => {
    const costFactor = 1 + buildingTier * rules.buildingUpgradeCoefficient;

    return convertQuantitiesToResources({
        quantities: multipleQuantitiesByScalar({
            quantities: rules.buildingUpgradeCosts[buildingType],
            scalar: costFactor,
        })
    });
};

const calculateFoodChangeInfo = ({citizensQuantity, pastureTier, rules}: { citizensQuantity: number, pastureTier: number, rules: CommonStateRules }): Quantities => {
    return {
        'citizens maintenance': -citizensQuantity * rules.unitFoodDemand,
        'pasture production': rules.resourceIncreaseChangeRateCoefficient * pastureTier,
        'peasants production': citizensQuantity * rules.unitFoodDemand,
    };
};

const calculateWoodChangeInfo = ({citizensQuantity, lumberMillTier, rules}: { citizensQuantity: number, lumberMillTier: number, rules: CommonStateRules }): Quantities => {
    return {
        'lumber mill production': rules.resourceIncreaseChangeRateCoefficient * lumberMillTier,
        'peasants production': citizensQuantity,
    };
};

export const calculateResourceChangeInfo = ({city, resourceType, rules}: { city: CommonStateCity, resourceType: string, rules: CommonStateRules }): Quantities => {
    switch (resourceType) {
        case 'food': {
            return calculateFoodChangeInfo({
                citizensQuantity: city.citizens.peasant,
                pastureTier: city.buildings.pasture.tier,
                rules
            });
        }
        case 'wood': {
            return calculateWoodChangeInfo({
                citizensQuantity: city.citizens.peasant,
                lumberMillTier: city.buildings.lumberMill.tier,
                rules
            });
        }
        default: {
            throw Error(`unsupported resource type: ${resourceType}`);
        }
    }
};

export const calculatePeasantChangeInfo = ({buildingTiersSum, citizensQuantity, food, foodChangeRate, rules}: { buildingTiersSum: number, citizensQuantity: number, food: number, foodChangeRate: number, rules: CommonStateRules }) => {
    const starvingPeopleQuantity = food > 0 || foodChangeRate > 0 ? 0 : Math.abs(foodChangeRate * rules.unitFoodDemand);
    const cityCapacity = rules.baseCityCapacity + Math.max(0, rules.baseCityCapacity * buildingTiersSum - starvingPeopleQuantity * rules.unitStarvingCoefficient);
    const growthFactorRate = rules.populationGrowthChangeRateCoefficient * citizensQuantity * (1 - (citizensQuantity / cityCapacity));
    const percentageOfPeopleStarving = citizensQuantity === 0 ? 0 : starvingPeopleQuantity / citizensQuantity;
    const migrationRate = starvingPeopleQuantity > 0 ? -rules.basePeasantsMigrationRate * percentageOfPeopleStarving : rules.basePeasantsMigrationRate;
    return {
        'growth': growthFactorRate,
        'migration': migrationRate,
    };
};

export const convertChangeInfoToChangeRate = ({changeInfo}: { changeInfo: Quantities }): number => {
    return Object
        .keys(changeInfo)
        .map(changeType => changeInfo[changeType])
        .reduce(
            (changeRate, partialChangeRate) => {
                return changeRate + partialChangeRate;
            },
            0
        );
};

export const convertChangeRateToDelta = ({changeRate, timeDelta}: { changeRate: number, timeDelta: number }): number => {
    return (changeRate / 3600) * timeDelta;
};
