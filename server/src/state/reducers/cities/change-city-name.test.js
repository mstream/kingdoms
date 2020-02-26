/**
 * @flow
 */

import {changeCityName} from '../../../../../common/src/actions';
import type {ServerState} from '../../../../../common/src/state';
import {changeCityNameCitiesReducer} from './change-city-name';

describe('changeCityNameCitiesReducer', () => {
    it('fails when city does not exist', () => {
        const action = changeCityName({
            cityId: '3',
            name: 'Newaaa',
            playerId: '1'
        });
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
        const expected = {
            errors: ['the city does not exist'],
            state: null,
        };
        const actual = changeCityNameCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('fails when city does not belong to the player', () => {
        const action = changeCityName({
            cityId: '1',
            name: 'Newaaa',
            playerId: '2'
        });
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
        const expected = {
            errors: ['the city does not belong to the player'],
            state: null,
        };
        const actual = changeCityNameCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('fails when the name is too short', () => {
        const action = changeCityName({cityId: '1', name: 'Ne', playerId: '1'});
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
        const expected = {
            errors: ['the city name is too short'],
            state: null,
        };
        const actual = changeCityNameCitiesReducer({action, state: previousState});
        expect(actual).toEqual(expected);
    });

    it('fails when the name is too long', () => {
        const action = changeCityName({
            cityId: '1',
            name: 'Newaaanewaaanewaaanewaaanewaaa',
            playerId: '1'
        });
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
        const expected = {
            errors: ['the city name is too long'],
            state: null,
        };
        const actual = changeCityNameCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });

    it('fails when the name does not follow the convention', () => {
        const action = changeCityName({
            cityId: '1',
            name: 'newaaa',
            playerId: '1'
        });
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
        const expected = {
            errors: ['the city name does not follow the convention'],
            state: null,
        };
        const actual = changeCityNameCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });

    it('changes the name', () => {
        const action = changeCityName({
            cityId: '1',
            name: 'Newaaa',
            playerId: '1'
        });
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
        const expected = {
            errors: [],
            state: [
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
            ],
        };
        const actual = changeCityNameCitiesReducer({
            action,
            state: previousState
        });
        expect(actual).toEqual(expected);
    });
});