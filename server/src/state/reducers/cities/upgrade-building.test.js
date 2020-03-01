/**
 * @flow
 */

import {upgradeBuildingCitiesReducer} from './upgrade-building';
import {upgradeBuilding} from '../../../../../common/src/actions';
import type {ServerState} from '../../../../../common/src/state';

describe('upgradeBuildingCitiesReducer', () => {
    it('fails when city does not exist', () => {
        const action = upgradeBuilding({
            buildingType: 'pasture',
            cityId: '1',
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
                    x: 3,
                    y: 3,
                },
                populationGrowthChangeRateCoefficient: 1,
                resourceIncreaseChangeRateCoefficient: 10000,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 0.2,
            },
            time: '2000-01-01T00:00:00Z',
            world: {size: {x: 10, y: 10},}
        };
        const expected = {
            errors: ['the city does not exist'],
            state: null,
        };
        const actual = upgradeBuildingCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });

    it('fails when city does not belong to the player', () => {
        const action = upgradeBuilding({
            buildingType: 'pasture',
            cityId: '1',
            playerId: '2'
        });
        const previousState: ServerState = {
            cities: {
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
                    name: 'Aaa',
                    ownerId: '1',
                    resources: {
                        food: 1000,
                        wood: 1000,
                    }
                },
            },
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
                    x: 3,
                    y: 3,
                },
                populationGrowthChangeRateCoefficient: 1,
                resourceIncreaseChangeRateCoefficient: 10000,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 0.2,
            },
            time: '2000-01-01T00:00:00Z',
            world: {size: {x: 10, y: 10},}
        };
        const expected = {
            errors: ['the city does not belong to the player'],
            state: null,
        };
        const actual = upgradeBuildingCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });

    it('fails when the resources are insufficient', () => {
        const action = upgradeBuilding({
            buildingType: 'pasture',
            cityId: '1',
            playerId: '1',
        });
        const previousState: ServerState = {
            cities: {
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
                    name: 'Aaa',
                    ownerId: '1',
                    resources: {
                        food: 100,
                        wood: 100,
                    }
                },
            },
            rules: {
                baseCityCapacity: 1000,
                buildingUpgradeCoefficient: 0.5,
                buildingUpgradeCosts: {
                    lumberMill: {
                        food: 300,
                        wood: 300,
                    },
                    pasture: {
                        food: 200,
                        wood: 300,
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
            },
            time: '2000-01-01T00:00:00Z',
            world: {size: {x: 10, y: 10},}
        };
        const expected = {
            errors: ['insufficient food', 'insufficient wood'],
            state: null,
        };
        const actual = upgradeBuildingCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });

    it('upgrades the tier and decreases used resources', () => {
        const action = upgradeBuilding({
            buildingType: 'pasture',
            cityId: '1',
            playerId: '1'
        });
        const previousState: ServerState = {
            cities: {
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
                    name: 'Aaa',
                    ownerId: '1',
                    resources: {
                        food: 1000,
                        wood: 1000,
                    }
                },
            },
            rules: {
                baseCityCapacity: 1000,
                buildingUpgradeCoefficient: 0.5,
                buildingUpgradeCosts: {
                    lumberMill: {
                        food: 300,
                        wood: 300,
                    },
                    pasture: {
                        food: 200,
                        wood: 300,
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
            },
            time: '2000-01-01T00:00:00Z',
            world: {size: {x: 10, y: 10},}
        };
        const expected = {
            errors: [],
            state:  {
                '1': {
                    buildings: {
                        lumberMill: {
                            tier: 0,
                        },
                        pasture: {
                            tier: 1,
                        }
                    },
                    citizens: {
                        peasant: 0,
                    },
                    location: {
                        x: 0,
                        y: 0,
                    },
                    name: 'Aaa',
                    ownerId: '1',
                    resources: {
                        food: 800,
                        wood: 700,
                    }
                },
            }
        };
        const actual = upgradeBuildingCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });
});