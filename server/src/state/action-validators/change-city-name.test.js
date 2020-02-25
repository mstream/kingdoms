/**
 * @flow
 */

import {validateChangeCityNameAction} from './change-city-name';
import {changeCityName, upgradeBuilding} from '../../../../common/src/actions';

describe('validateChangeCityNameAction', () => {
    it('returns error if city with given id does not exist', () => {
        const action = changeCityName({cityId: '1', name: 'Newciyname'});

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
        const expected = ['city 1 does not exist'];
        const actual = validateChangeCityNameAction({action, state});
        expect(actual).toEqual(expect.arrayContaining(expected));
        expect(actual.length).toEqual(expected.length);
    });

    it('returns no errors when city name is correct', () => {
        const action = changeCityName({cityId: '1', name: 'Newciyname'});
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
                    name: 'city1',
                    ownerId: '1',
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
        const expected = [];
        const actual = validateChangeCityNameAction({action, state});
        expect(actual).toEqual(expect.arrayContaining(expected));
        expect(actual.length).toEqual(expected.length);
    });

    it('returns error when the name is too short', () => {
        const action = changeCityName({cityId: '1', name: 'Ab'});
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
                    name: 'city1',
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
        const expected = ['city name is too short'];
        const actual = validateChangeCityNameAction({action, state});
        expect(actual).toEqual(expect.arrayContaining(expected));
        expect(actual.length).toEqual(expected.length);
    });

    it('returns error when the name is too long', () => {
        const action = changeCityName({cityId: '1', name: 'Abcdeabcdeabcdeabcdeabcde'});
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
                    name: 'city1',
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
        const expected = ['city name is too long'];
        const actual = validateChangeCityNameAction({action, state});
        expect(actual).toEqual(expect.arrayContaining(expected));
        expect(actual.length).toEqual(expected.length);
    });

    it('returns error when the name is does not follow the convention', () => {
        const action = changeCityName({cityId: '1', name: 'newName'});
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
                    name: 'city1',
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
        const expected = ['city name does not follow the convention'];
        const actual = validateChangeCityNameAction({action, state});
        expect(actual).toEqual(expect.arrayContaining(expected));
        expect(actual.length).toEqual(expected.length);
    });
});
