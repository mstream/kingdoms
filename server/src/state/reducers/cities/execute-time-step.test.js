/**
 * @flow
 */

import {executeTimeStep, resetState} from '../../../../../common/src/actions';
import type {
    CommonStateCities,
    ServerState
} from '../../../../../common/src/state';
import type {ServerStateReducerResult} from '../root';
import {executeTimeStepCitiesReducer} from './execute-time-step';

describe('executeTimeStepCitiesReducer', () => {
    it('previous time newer than the one from action', () => {
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
            errors: ['the time from the action is not past the time from the state'],
            state: null,
        };
        const actual = executeTimeStepCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('scenario 1', () => {
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
        const actual = executeTimeStepCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('scenario 2', () => {
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
        const actual = executeTimeStepCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('scenario 3', () => {
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
        const actual = executeTimeStepCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

});