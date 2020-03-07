// @flow
import type { ServerState } from '../../../common/src/state';

const initialCitiesState = {};

const initialCitiesByOwner = {};

const initialRules = {
    baseCityCapacity: 1000,
    basePeasantsMigrationRate: 100,
    buildingUpgradeCoefficient: 0.5,
    buildingUpgradeCosts: {
        lumberMill: {
            food: 0,
            wood: 100,
        },
        pasture: {
            food: 0,
            wood: 50,
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
};

const initialTime = new Date().toISOString();

const initialWorld = { size: { x: 10, y: 10 } };

export const initialServerState: ServerState = {
    cities: initialCitiesState,
    citiesByOwner: initialCitiesByOwner,
    rules: initialRules,
    time: initialTime,
    world: initialWorld,
};

export const initialCityState = {
    buildings: {
        lumberMill: {
            tier: 0,
        },
        pasture: {
            tier: 0,
        },
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
    resources: {
        food: 0,
        wood: 0,
    },
};
