/**
 * @flow
 */

import {
    abandonCity,
    changeCityName,
    executeTimeStep,
    upgradeBuilding
} from '../../../../common/src/actions';
import type {
    CommonStateCities,
    ServerState
} from '../../../../common/src/state';
import {citiesReducer} from './cities';
import type {ServerStateReducerResult} from './root';

describe('citiesReducer', () => {
    it('returns error if city with given id does not exist', () => {
        const action = changeCityName({
            cityId: '1',
            name: 'Newcityname',
            playerId: '1'
        });

        const state = {
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
        const expected: ServerStateReducerResult<CommonStateCities> = {errors: ['city 1 does not exist'], state: null};
        const actual = citiesReducer({action, state});
        expect(actual).toEqual(expected);
    });

    it('returns error if city does not belong to the player', () => {
        const action = changeCityName({
            cityId: '1',
            name: 'Newcityname',
            playerId: '1'
        });

        const state = {
            cities: [
                {
                    id: '1',
                    buildings: {
                        lumberMill: {
                            tier: 0,
                        },
                        pasture: {
                            tier: 0,
                        }
                    },
                    citizens: {
                        peasant: 0
                    },
                    location: {x: 0, y: 0},
                    name: 'Aaa',
                    ownerId: '2',
                    resources: {
                        food: 0,
                        wood: 50,
                    },
                }
            ],
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
        const expected: ServerStateReducerResult<CommonStateCities> = {errors: ['city 1 does not belong to player 1'], state: null};
        const actual = citiesReducer({action, state});
        expect(actual).toEqual(expected);
    });

    it('returns error when the name is too short', () => {
        const action = changeCityName({cityId: '1', name: 'Ab', playerId: '1'});
        const state = {
            cities: [
                {
                    id: '1',
                    buildings: {
                        lumberMill: {
                            tier: 0,
                        },
                        pasture: {
                            tier: 0,
                        }
                    },
                    citizens: {
                        peasant: 0
                    },
                    location: {x: 0, y: 0},
                    name: 'Aaa',
                    ownerId: '1',
                    resources: {
                        food: 0,
                        wood: 50,
                    },
                }
            ],
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
                        wood: 100,
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
        const expected: ServerStateReducerResult<CommonStateCities> = {errors: ['city name is too short'], state: null};
        const actual = citiesReducer({action, state});
        expect(actual).toEqual(expected);
    });

    it('returns error when the name is too long', () => {
        const action = changeCityName({
            cityId: '1',
            name: 'Abcdeabcdeabcdeabcdeabcde',
            playerId: '1',
        });
        const state = {
            cities: [
                {
                    id: '1',
                    buildings: {
                        lumberMill: {
                            tier: 0,
                        },
                        pasture: {
                            tier: 0,
                        }
                    },
                    citizens: {
                        peasant: 0
                    },
                    location: {x: 0, y: 0},
                    name: 'Aaa',
                    ownerId: '1',
                    resources: {
                        food: 0,
                        wood: 50,
                    },
                }
            ],
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
                        wood: 100,
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
        const expected: ServerStateReducerResult<CommonStateCities> = {errors: ['city name is too long'], state: null};
        const actual = citiesReducer({action, state});
        expect(actual).toEqual(expected);
    });

    it('returns error when the name is does not follow the convention', () => {
        const action = changeCityName({
            cityId: '1',
            name: 'newName',
            playerId: '1'
        });
        const state = {
            cities: [
                {
                    id: '1',
                    buildings: {
                        lumberMill: {
                            tier: 0,
                        },
                        pasture: {
                            tier: 0,
                        }
                    },
                    citizens: {
                        peasant: 0
                    },
                    location: {x: 0, y: 0},
                    name: 'Aaa',
                    ownerId: '1',
                    resources: {
                        food: 0,
                        wood: 50,
                    },
                }
            ],
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
                        wood: 100,
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
        const expected: ServerStateReducerResult<CommonStateCities> = {errors:  ['city name does not follow the convention'], state: null};
        const actual = citiesReducer({action, state});
        expect(actual).toEqual(expected);
    });

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
        const expected: ServerStateReducerResult<CommonStateCities> = {
            errors: [],
            state: [],
        };
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
                    name: 'Aaa',
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
        const expected: ServerStateReducerResult<CommonStateCities> = {
            errors: ['the time from action 2000-01-01T01:00:00Z is not past the time from the state 2000-01-02T00:00:00Z'],
            state: null,
        };
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
                    name: 'Aaa',
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
        const expected: ServerStateReducerResult<CommonStateCities> = {
            errors: [], state: [
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
                    name: 'Aaa',
                    ownerId: '1',
                    resources: {
                        food: 11000,
                        wood: 11000,
                    }
                }
            ]
        };
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
                    name: 'Bbb',
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
        const expected: ServerStateReducerResult<CommonStateCities> = {
            errors: [], state: [
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
                    name: 'Bbb',
                    ownerId: '2',
                    resources: {
                        food: 10500,
                        wood: 20000,
                    }
                },
            ]
        };
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
                    name: 'Ccc',
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
        const expected: ServerStateReducerResult<CommonStateCities> = {
            errors: [], state: [
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
                    name: 'Ccc',
                    ownerId: '3',
                    resources: {
                        food: 0,
                        wood: 11000,
                    }
                },
            ]
        };
        const actual = citiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('returns error if city with given id does not exist', () => {
        const action = upgradeBuilding({buildingType: 'pasture', cityId: '1', playerId: '1'});
        const state = {
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
        const expected: ServerStateReducerResult<CommonStateCities> = {errors: ['city 1 does not exist'], state: null};
        const actual = citiesReducer({action, state});
        expect(actual).toEqual(expected);
    });

    it('returns error if city does not belong to the player', () => {
        const action = upgradeBuilding({buildingType: 'pasture', cityId: '1', playerId: '1'});
        const state = {
            cities: [
                {
                    id: '1',
                    buildings: {
                        lumberMill: {
                            tier: 0,
                        },
                        pasture: {
                            tier: 0,
                        }
                    },
                    citizens: {
                        peasant: 0
                    },
                    location: {x: 0, y: 0},
                    name: 'Aaa',
                    ownerId: '2',
                    resources: {
                        food: 100,
                        wood: 100,
                    },
                }
            ],
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
        const expected: ServerStateReducerResult<CommonStateCities> = {errors: ['city 1 does not belong to player 1'], state: null};
        const actual = citiesReducer({action, state});
        expect(actual).toEqual(expected);
    });

    it('returns error for every insufficient resource', () => {
        const action = upgradeBuilding({buildingType: 'pasture', cityId: '1', playerId: '1'});
        const state = {
            cities: [
                {
                    id: '1',
                    buildings: {
                        lumberMill: {
                            tier: 0,
                        },
                        pasture: {
                            tier: 0,
                        }
                    },
                    citizens: {
                        peasant: 0
                    },
                    location: {x: 0, y: 0},
                    name: 'Aaa',
                    ownerId: '1',
                    resources: {
                        food: 0,
                        wood: 50,
                    },
                }
            ],
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
                        wood: 100,
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
        const expected: ServerStateReducerResult<CommonStateCities> = {errors: ['insufficient wood'], state: null};
        const actual = citiesReducer({action, state});
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
                    name: 'Aaa',
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
                    name: 'Bbb',
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
            worldSize: {x: 10, y: 10},
        };
        const action = upgradeBuilding({
            buildingType: 'pasture',
            cityId: '1',
            playerId: '1'
        });
        const expected: ServerStateReducerResult<CommonStateCities> = {
            errors: [], state: [
                {
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
                    id: '1',
                    location: {
                        x: 0,
                        y: 0,
                    },
                    name: 'Aaa',
                    ownerId: '1',
                    resources: {
                        food: 1000,
                        wood: 950,
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
                    name: 'Bbb',
                    ownerId: '1',
                    resources: {
                        food: 1000,
                        wood: 1000,
                    }
                },
            ]
        };
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
                    name: 'Aaa',
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
                    name: 'Bbb',
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
        const action = changeCityName({
            cityId: '1',
            name: 'Newaaa',
            playerId: '1'
        });
        const expected: ServerStateReducerResult<CommonStateCities> = {
            errors: [], state: [
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
                    name: 'Newaaa',
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
                    name: 'Bbb',
                    ownerId: '1',
                    resources: {
                        food: 1000,
                        wood: 1000,
                    }
                },
            ]
        };
        const actual = citiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('handles abandon city action', () => {
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
                    name: 'Aaa',
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
                    name: 'Bbb',
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
        const action = abandonCity({cityId: '1', playerId: '1'});
        const expected: ServerStateReducerResult<CommonStateCities> = {
            errors: [], state: [
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
                    name: 'Aaa',
                    ownerId: null,
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
                    name: 'Bbb',
                    ownerId: '1',
                    resources: {
                        food: 1000,
                        wood: 1000,
                    }
                },
            ]
        };
        const actual = citiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });
});
