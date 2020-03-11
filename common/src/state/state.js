// @flow
import type { CommonState } from '../../../common/src/state';

const initialCitiesState = {};

const initialCitiesByOwner = {};

const initialUnitStatsState = {
    archer: {},
    catapult: 0,
    knight: 0,
    noble: 0,
    peasant: 0,
    pikeman: 0,
    swordman: 0,
};

const initialRulesState = {
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
        warehouse: {
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
    unitStats: {
        archer: {
            attack: 2,
            defence: 1,
        },
        catapult: {
            attack: 100,
            defence: 1,
        },
        knight: {
            attack: 10,
            defence: 10,
        },
        noble: {
            attack: 1,
            defence: 1,
        },
        peasant: {
            attack: 1,
            defence: 1,
        },
        pikeman: {
            attack: 5,
            defence: 2,
        },
        swordman: {
            attack: 10,
            defence: 2,
        },
    },
};

const initialTimeState = new Date().toISOString();

const initialWorldState = { size: { x: 10, y: 10 } };

export const initialCommonState: CommonState = {
    cities: initialCitiesState,
    citiesByOwner: initialCitiesByOwner,
    rules: initialRulesState,
    time: initialTimeState,
    world: initialWorldState,
};

export const initialCityState = {
    buildings: {
        lumberMill: {
            tier: 0,
        },
        pasture: {
            tier: 0,
        },
        warehouse: {
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
