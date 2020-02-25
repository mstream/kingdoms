/**
 * @flow
 */

import type {Vector} from './vector';
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
    pasture: CommonStateBuilding
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
    id: string,
    location: Vector,
    name: string,
    ownerId: string,
    resources: CommonStateResources,
};

export type CommonStateCities = $ReadOnlyArray<CommonStateCity>;

export type CommonStateBuildingUpgradeCosts = {
    lumberMill: CommonStateResources,
    pasture: CommonStateResources,
};

export type CommonStateRules = {
    baseCityCapacity: number,
    buildingUpgradeCoefficient: number,
    buildingUpgradeCosts: CommonStateBuildingUpgradeCosts,
    populationGrowthChangeRateCoefficient: number,
    resourceIncreaseChangeRateCoefficient: number,
    unitFoodDemand: number,
    unitStarvingCoefficient: number,
};

export type CommonStateTime = string;

export type CommonStateWorldSize = Vector;

export type ServerState = {
    cities: CommonStateCities,
    rules: CommonStateRules,
    time: CommonStateTime,
    worldSize: CommonStateWorldSize,
};
//
// export const ServerStateSchema = t.object({
//     cities: t.arrayOf(t.object({
//         buildings: t.object({
//             tier: t.number,
//         }),
//         citizens: t.object({
//             peasant: t.number,
//         }),
//         id: t.string,
//         location: t.object({
//             x: t.number,
//             y: t.number,
//         }),
//         name: t.string,
//         ownerId: t.string,
//         resources: t.object({
//             food: t.number,
//             wood: t.number,
//         }),
//     })),
//     rules: t.object({
//         baseCityCapacity: t.number,
//         buildingUpgradeCoefficient: t.number,
//         buildingUpgradeCosts: t.object({
//             lumberMill: t.object({
//                 food: t.number,
//                 wood: t.number,
//             }),
//             pasture: t.object({
//                 food: t.number,
//                 wood: t.number,
//             }),
//         }),
//         populationGrowthChangeRateCoefficient: t.number,
//         resourceIncreaseChangeRateCoefficient: t.number,
//         unitFoodDemand: t.number,
//         unitStarvingCoefficient: t.number,
//     }),
//     time: t.string,
//     worldSize: t.object({
//         x: t.number,
//         y: t.number,
//     }),
// });

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
        'pasture production': rules.resourceIncreaseChangeRateCoefficient * pastureTier,
        'citizens maintenance': -citizensQuantity * rules.unitFoodDemand
    };
};

const calculateWoodChangeInfo = ({lumberMillTier, rules}: { lumberMillTier: number, rules: CommonStateRules }): Quantities => {
    return {
        'lumber mill production': rules.resourceIncreaseChangeRateCoefficient * lumberMillTier,
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
    const growthFactorChange = rules.populationGrowthChangeRateCoefficient * citizensQuantity * (1 - (citizensQuantity / cityCapacity));
    return {
        'growth rate': growthFactorChange
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
