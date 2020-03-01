/**
 * @flow
 */
import type {ServerState} from '../../../common/src/state';

const initialCities = {};

const initialRules = {
    baseCityCapacity: 1000,
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

const initialWorld = {size: {x: 32, y: 32}};

export const initialState: ServerState = {
    cities: initialCities,
    rules: initialRules,
    time: initialTime,
    world: initialWorld,
};