/**
 * @flow
 */
import type {ServerState} from '../../../common/src/state';

const emptyCities = {};

const initialCities = {};

const emptyRules = {
    baseCityCapacity: 0,
    basePeasantsMigrationRate: 0,
    buildingUpgradeCoefficient: 0,
    buildingUpgradeCosts: {
        lumberMill: {
            food: 0,
            wood: 0,
        },
        pasture: {
            food: 0,
            wood: 0,
        },
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

const emptyTime = '';

const initialTime = new Date().toISOString();

const emptyWorld = {size: {x: 0, y: 0}};

const initialWorld = {size: {x: 32, y: 32}};

export const emptyState: ServerState = {
    cities: emptyCities,
    rules: emptyRules,
    time: emptyTime,
    world: emptyWorld,
};

export const initialState: ServerState = {
    cities: initialCities,
    rules: initialRules,
    time: initialTime,
    world: initialWorld,
};

export const emptyCityState = {
    buildings: {
        lumberMill: {
            tier: 0,
        },
        pasture: {
            tier: 0,
        },
    },
    citizens: {
        peasant: 0,
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

export const initialCityState = {
    buildings: {
        lumberMill: {
            tier: 0,
        },
        pasture: {
            tier: 0,
        },
    },
    citizens: {
        peasant: 0,
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