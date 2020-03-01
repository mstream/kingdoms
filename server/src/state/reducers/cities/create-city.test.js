/**
 * @flow
 */

import {createCity} from '../../../../../common/src/actions';
import type {ServerState} from '../../../../../common/src/state';
import {createCityCitiesReducer} from './create-city';

describe('createCityCitiesReducer', () => {
    it('fails when there is not enough space for the city', () => {
        const action = createCity({
            cityId: '1',
            cityName: 'Abc',
            playerId: '1'
        });
        const previousState: ServerState = {
            cities: {},
            rules: {
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
                    x: 2,
                    y: 2,
                },
                populationGrowthChangeRateCoefficient: 1,
                resourceIncreaseChangeRateCoefficient: 10000,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 0.2,
            },
            time: '2000-01-01T00:00:00Z',
            world: {size: {x: 1, y: 1},}
        };
        const expected = {
            errors: ['there is no space for another city'],
            state: null,
        };
        const actual = createCityCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('fails when the city name is too short', () => {
        const action = createCity({
            cityId: '1',
            cityName: 'Ab',
            playerId: '1'
        });
        const previousState: ServerState = {
            cities: {},
            rules: {
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
                    x: 1,
                    y: 1,
                },
                populationGrowthChangeRateCoefficient: 1,
                resourceIncreaseChangeRateCoefficient: 10000,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 0.2,
            },
            time: '2000-01-01T00:00:00Z',
            world: {size: {x: 1, y: 1},}
        };
        const expected = {
            errors: ['the city name is too short'],
            state: null,
        };
        const actual = createCityCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('fails when the city name is too long', () => {
        const action = createCity({
            cityId: '1',
            cityName: 'Abcdeabcdeabcdeabcdeabcde',
            playerId: '1'
        });
        const previousState: ServerState = {
            cities: {},
            rules: {
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
                    x: 1,
                    y: 1,
                },
                populationGrowthChangeRateCoefficient: 1,
                resourceIncreaseChangeRateCoefficient: 10000,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 0.2,
            },
            time: '2000-01-01T00:00:00Z',
            world: {size: {x: 1, y: 1},}
        };
        const expected = {
            errors: ['the city name is too long'],
            state: null,
        };
        const actual = createCityCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('fails when the city does not follow the convention', () => {
        const action = createCity({
            cityId: '1',
            cityName: 'abc',
            playerId: '1'
        });
        const previousState: ServerState = {
            cities: {},
            rules: {
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
                    x: 1,
                    y: 1,
                },
                populationGrowthChangeRateCoefficient: 1,
                resourceIncreaseChangeRateCoefficient: 10000,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 0.2,
            },
            time: '2000-01-01T00:00:00Z',
            world: {size: {x: 1, y: 1},}
        };
        const expected = {
            errors: ['the city name does not follow the convention'],
            state: null,
        };
        const actual = createCityCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('creates a new city', () => {
        const action = createCity({
            cityId: '1',
            cityName: 'Abc',
            playerId: '1'
        });
        const previousState: ServerState = {
            cities: {},
            rules: {
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
                    x: 1,
                    y: 1,
                },
                populationGrowthChangeRateCoefficient: 1,
                resourceIncreaseChangeRateCoefficient: 10000,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 0.2,
            },
            time: '2000-01-01T00:00:00Z',
            world: {size: {x: 1, y: 1},}
        };
        const expected = {
            errors: [],
            state: {
                '1': {
                    buildings: {
                        lumberMill: {
                            tier: 0,
                        },
                        pasture: {
                            tier: 0,
                        }
                    },
                    citizens: {
                        peasant: 0,
                    },
                    location: {
                        x: 0,
                        y: 0,
                    },
                    name: 'Abc',
                    ownerId: '1',
                    resources: {
                        food: 0,
                        wood: 0,
                    }
                },
            },
        };
        const actual = createCityCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});