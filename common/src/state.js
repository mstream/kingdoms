// @flow
// @flow-runtime

import type { Vector } from './vector';
import { addVectors, getDistanceBetweenVectors } from './vector';
import type { Quantities } from './quantity';
import { multipleQuantitiesByScalar } from './quantity';
import { convertQuantitiesToResources } from './resource';
import type { Type } from 'flow-runtime';
import { reify } from 'flow-runtime';

type Upgradeable = {
    tier: number,
};

export type CommonStateBuilding = Upgradeable;

export type CommonStateCitizen = number;

export type CommonStateResource = number;

export type CommonStateBuildings = {
    lumberMill: CommonStateBuilding,
    pasture: CommonStateBuilding,
    warehouse: CommonStateBuilding,
}

export type CommonStateUnits = {
    archer: CommonStateCitizen,
    catapult: CommonStateCitizen,
    knight: CommonStateCitizen,
    noble: CommonStateCitizen,
    peasant: CommonStateCitizen,
    pikeman: CommonStateCitizen,
    swordman: CommonStateCitizen,
}

export type CommonStateResources = {
    food: CommonStateResource,
    wood: CommonStateResource
}

export type CommonStateCity = {
    buildings: CommonStateBuildings,
    location: Vector,
    name: string,
    ownerId: ?string,
    resources: CommonStateResources,
    units: CommonStateUnits,
    ...
};

export type CommonStateCities = { [string]: CommonStateCity, ... };
export type CommonStateCitiesByOwner = { [string]: $ReadOnlyArray<string>, ... };

export type CommonStateBuildingUpgradeCosts = {
    lumberMill: CommonStateResources,
    pasture: CommonStateResources,
    warehouse: CommonStateResources,
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
    citiesByOwner: CommonStateCitiesByOwner,
    rules: CommonStateRules,
    time: CommonStateTime,
    world: CommonStateWorld,
    ...
};

export const ServerStateType = (reify: Type<ServerState>);

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
        case 'food': {
            return calculateFoodChangeInfo({
                unitsQuantity: city.units.peasant,
                pastureTier: city.buildings.pasture.tier,
                rules,
            });
        }
        case 'wood': {
            return calculateWoodChangeInfo({
                unitsQuantity: city.units.peasant,
                lumberMillTier: city.buildings.lumberMill.tier,
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

const emptyCitiesState = {};

const emptyCitiesByOwnerState = {};

export const emptyResourcesState = {
    food: 0,
    wood: 0,
};

const emptyRulesState = {
    baseCityCapacity: 0,
    basePeasantsMigrationRate: 0,
    buildingUpgradeCoefficient: 0,
    buildingUpgradeCosts: {
        lumberMill: emptyResourcesState,
        pasture: emptyResourcesState,
        warehouse: emptyResourcesState,
    },
    minimalCityMargin: {
        x: 0,
        y: 0,
    },
    populationGrowthChangeRateCoefficient: 0,
    resourceIncreaseChangeRateCoefficient: 0,
    unitFoodDemand: 0,
    unitStarvingCoefficient: 0,
};

const emptyTimeState = '';

const emptyWorldState = { size: { x: 0, y: 0 } };

export const emptyServerState: ServerState = {
    cities: emptyCitiesState,
    citiesByOwner: emptyCitiesByOwnerState,
    rules: emptyRulesState,
    time: emptyTimeState,
    world: emptyWorldState,
};

const emptyBuildingState: CommonStateBuilding = {
    tier: 0,
};

export const emptyCityState = {
    buildings: {
        lumberMill: emptyBuildingState,
        pasture: emptyBuildingState,
        warehouse: emptyBuildingState,
    },
    units: {
        archer: 0,
        catapult: 0,
        knight: 0,
        noble: 0,
        peasant: 0,
        pikeman: 0,
        swordman: 0,
    },
    location: {
        x: 0,
        y: 0,
    },
    name: '',
    ownerId: null,
    resources: emptyResourcesState,
};
