/**
 * @flow
 */

import {
    changeCityName,
    executeTimeStep,
    upgradeBuilding
} from '../../../../common/src/actions';
import type {
    CommonStateCities,
    ServerState
} from '../../../../common/src/state';
import {citiesReducer} from './cities';

describe('citiesReducer', () => {
    it('returns the current state on unsupported action', () => {
        const action = {
            type: '_DUMMY_',
        };
        const previousState: ServerState = {
            cities: [],
            rules: {
                baseCityCapacity: 0,
                buildingUpgradeCoefficient: 0,
                buildingUpgradeCosts: {
                    lumberMill: {
                        food: 0,
                        wood: 0,
                    },
                    pasture: {
                        food: 0,
                        wood: 0,
                    }
                },
                populationGrowthChangeRateCoefficient: 0,
                resourceIncreaseChangeRateCoefficient: 0,
                unitFoodDemand: 0,
                unitStarvingCoefficient: 0,
            },
            time: '2000-01-01T00:00:00Z',
            worldSize: {x: 10, y: 10},
        };
        const expected: CommonStateCities = previousState.cities;
        const actual = citiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('handles execute time step action: previous time newer than the one from action', () => {
        const previousState: ServerState = {
            cities: [
                {
                    buildings: {
                        lumberMill: {
                            tier: 1,
                        },
                        pasture: {
                            tier: 1
                        }
                    },
                    citizens: {
                        peasant: 1000,
                    },
                    id: '1',
                    location: {
                        x: 1,
                        y: 1
                    },
                    name: 'city1',
                    ownerId: '1',
                    resources: {
                        food: 2000,
                        wood: 1000,
                    }
                },
            ],
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
                populationGrowthChangeRateCoefficient: 1,
                resourceIncreaseChangeRateCoefficient: 10000,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 0.2,
            },
            time: '2000-01-02T00:00:00Z',
            worldSize: {x: 10, y: 10}
        };
        const updateTime = '2000-01-01T01:00:00Z';
        const action = executeTimeStep({time: updateTime});
        const expected: CommonStateCities = [
            {
                buildings: {
                    lumberMill: {
                        tier: 1,
                    },
                    pasture: {
                        tier: 1
                    }
                },
                citizens: {
                    peasant: 1000,
                },
                id: '1',
                location: {
                    x: 1,
                    y: 1
                },
                name: 'city1',
                ownerId: '1',
                resources: {
                    food: 2000,
                    wood: 1000,
                }
            },
        ];
        const actual = citiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('handles execute time step action 1', () => {
        const previousState: ServerState = {
            cities: [
                {
                    buildings: {
                        lumberMill: {
                            tier: 1,
                        },
                        pasture: {
                            tier: 1
                        }
                    },
                    citizens: {
                        peasant: 1000,
                    },
                    id: '1',
                    location: {
                        x: 1,
                        y: 1
                    },
                    name: 'city1',
                    ownerId: '1',
                    resources: {
                        food: 2000,
                        wood: 1000,
                    }
                },
            ],
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
                populationGrowthChangeRateCoefficient: 1,
                resourceIncreaseChangeRateCoefficient: 10000,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 0.2,
            },
            time: '2000-01-01T00:00:00Z',
            worldSize: {x: 10, y: 10}
        };
        const updateTime = '2000-01-01T01:00:00Z';
        const action = executeTimeStep({time: updateTime});
        const expected: CommonStateCities = [
            {
                buildings: {
                    lumberMill: {
                        tier: 1,
                    },
                    pasture: {
                        tier: 1
                    }
                },
                citizens: {
                    peasant: 1666,
                },
                id: '1',
                location: {
                    x: 1,
                    y: 1
                },
                name: 'city1',
                ownerId: '1',
                resources: {
                    food: 11000,
                    wood: 11000,
                }
            }
        ];
        const actual = citiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('handles execute time step action 2', () => {
        const previousState: ServerState = {
            cities: [
                {
                    buildings: {
                        lumberMill: {
                            tier: 2,
                        },
                        pasture: {
                            tier: 1
                        }
                    },
                    citizens: {
                        peasant: 500,
                    },
                    id: '2',
                    location: {
                        x: 2,
                        y: 2
                    },
                    name: 'city2',
                    ownerId: '2',
                    resources: {
                        food: 1000,
                        wood: 0,
                    }
                },
            ],
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
                populationGrowthChangeRateCoefficient: 1,
                resourceIncreaseChangeRateCoefficient: 10000,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 0.2,
            },
            time: '2000-01-01T00:00:00Z',
            worldSize: {x: 10, y: 10}
        };
        const updateTime = '2000-01-01T01:00:00Z';
        const action = executeTimeStep({time: updateTime});
        const expected: CommonStateCities = [
            {
                buildings: {
                    lumberMill: {
                        tier: 2,
                    },
                    pasture: {
                        tier: 1
                    }
                },
                citizens: {
                    peasant: 937
                },
                id: '2',
                location: {
                    x: 2,
                    y: 2,
                },
                name: 'city2',
                ownerId: '2',
                resources: {
                    food: 10500,
                    wood: 20000,
                }
            },
        ];
        const actual = citiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('handles execute time step action 3', () => {
        const previousState: ServerState = {
            cities: [
                {
                    buildings: {
                        lumberMill: {
                            tier: 1,
                        },
                        pasture: {
                            tier: 0
                        }
                    },
                    citizens: {
                        peasant: 2000,
                    },
                    id: '3',
                    location: {
                        x: 2,
                        y: 2,
                    },
                    name: 'city3',
                    ownerId: '3',
                    resources: {
                        food: 1000,
                        wood: 1000,
                    }
                },
            ],
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
                populationGrowthChangeRateCoefficient: 1,
                resourceIncreaseChangeRateCoefficient: 10000,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 0.2,
            },
            time: '2000-01-01T00:00:00Z',
            worldSize: {x: 10, y: 10}
        };
        const updateTime = '2000-01-01T01:00:00Z';
        const action = executeTimeStep({time: updateTime});
        const expected: CommonStateCities = [
            {
                buildings: {
                    lumberMill: {
                        tier: 1,
                    },
                    pasture: {
                        tier: 0
                    }
                },
                citizens: {
                    peasant: 1500,
                },
                id: '3',
                location: {
                    x: 2,
                    y: 2,
                },
                name: 'city3',
                ownerId: '3',
                resources: {
                    food: 0,
                    wood: 11000,
                }
            },
        ];
        const actual = citiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('handles building upgrade action', () => {
        const previousState: ServerState = {
            cities: [
                {
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
                    id: '1',
                    location: {
                        x: 0,
                        y: 0,
                    },
                    name: 'city1',
                    ownerId: '1',
                    resources: {
                        food: 1000,
                        wood: 1000,
                    }
                },
                {
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
                    id: '2',
                    location: {
                        x: 0,
                        y: 0,
                    },
                    name: 'city2',
                    ownerId: '1',
                    resources: {
                        food: 1000,
                        wood: 1000,
                    }
                },
            ],
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
                populationGrowthChangeRateCoefficient: 1,
                resourceIncreaseChangeRateCoefficient: 10000,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 0.2,
            },
            time: '2000-01-01T00:00:00Z',
            worldSize: {x: 10, y: 10}
        };
        const action = upgradeBuilding({buildingType: 'pasture', cityId: '1'});
        const expected: CommonStateCities = [
            {
                buildings: {
                    lumberMill: {
                        tier: 0,
                    },
                    pasture: {
                        tier: 1,
                        upgradeCostInfo: {
                            wood: 100
                        }
                    }
                },
                citizens: {
                    peasant: 0,
                },
                id: '1',
                location: {
                    x: 0,
                    y: 0,
                },
                name: 'city1',
                ownerId: '1',
                resources: {
                    food: 1000,
                    wood: 900,
                }
            },
            {
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
                id: '2',
                location: {
                    x: 0,
                    y: 0,
                },
                name: 'city2',
                ownerId: '1',
                resources: {
                    food: 1000,
                    wood: 1000,
                }
            },
        ];
        const actual = citiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('handles change city name action', () => {
        const previousState: ServerState = {
            cities: [
                {
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
                    id: '1',
                    location: {
                        x: 0,
                        y: 0,
                    },
                    name: 'city1',
                    ownerId: '1',
                    resources: {
                        food: 1000,
                        wood: 1000,
                    }
                },
                {
                    buildings: {
                        lumberMill: {
                            tier: 0,
                        },
                        pasture: {
                            tier: 0,
                            upgradeCostInfo: {
                                wood: 100
                            }
                        }
                    },
                    citizens: {
                        peasant: 0,
                    },
                    id: '2',
                    location: {
                        x: 0,
                        y: 0,
                    },
                    name: 'city2',
                    ownerId: '1',
                    resources: {
                        food: 1000,
                        wood: 1000,
                    }
                },
            ],
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
                populationGrowthChangeRateCoefficient: 1,
                resourceIncreaseChangeRateCoefficient: 10000,
                unitFoodDemand: 1,
                unitStarvingCoefficient: 0.2,
            },
            time: '2000-01-01T00:00:00Z',
            worldSize: {x: 10, y: 10}
        };
        const action = changeCityName({cityId: '1', name: 'newCity1'});
        const expected: CommonStateCities = [
            {
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
                id: '1',
                location: {
                    x: 0,
                    y: 0,
                },
                name: 'newCity1',
                ownerId: '1',
                resources: {
                    food: 1000,
                    wood: 1000,
                }
            },
            {
                buildings: {
                    lumberMill: {
                        tier: 0,
                    },
                    pasture: {
                        tier: 0,
                        upgradeCostInfo: {
                            wood: 100
                        }
                    }
                },
                citizens: {
                    peasant: 0,
                },
                id: '2',
                location: {
                    x: 0,
                    y: 0,
                },
                name: 'city2',
                ownerId: '1',
                resources: {
                    food: 1000,
                    wood: 1000,
                }
            },
        ];
        const actual = citiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});
