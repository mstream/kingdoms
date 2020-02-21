/**
 * @flow
 */

import {upgradeBuildingActionValidator} from './upgrade-building';

describe('upgradeBuildingActionValidator', () => {
    it('returns error if city with given id does not exist', () => {
        const action = {
            type: 'UPGRADE_BUILDING',
            payload: {
                buildingType: 'pasture',
                cityId: '1',
            }
        };
        const state = {
            cities: [],
            rules: {
                baseCityCapacity: 0,
                buildingUpgradeCoefficient: 0,
                buildingUpgradeCosts: {
                    lumberMill: {
                        wood: 0
                    },
                    pasture: {
                        wood: 0
                    }
                },
                populationGrowthChangeRateCoefficient: 0,
                resourceIncreaseChangeRateCoefficient: 0,
                unitFoodDemand: 0,
                unitStarvingCoefficient: 0,
            },
            time: null,
            worldSizeInTiles: {x: 10, y: 10},
        };
        const expected = ['city 1 does not exist'];
        const actual = upgradeBuildingActionValidator({action, state});
        expect(actual).toEqual(expect.arrayContaining(expected));
        expect(actual.length).toEqual(expected.length);
    });

    it('returns no errors when all resources are sufficient', () => {
        const action = {
            type: 'UPGRADE_BUILDING',
            payload: {
                buildingType: 'pasture',
                cityId: '1',
            }
        };
        const state = {
            cities: [
                {
                    id: '1',
                    buildings: {
                        lumberMill: {
                            tier: 0,
                            upgradeCostInfo: {
                                wood: 100,
                            }
                        },
                        pasture: {
                            tier: 0,
                            upgradeCostInfo: {
                                wood: 100,
                            }
                        }
                    },
                    citizens: {
                        peasant: {
                            changeInfo: {},
                            quantity: 0
                        }
                    },
                    location: {x: 0, y: 0},
                    name: 'city1',
                    ownerId: '1',
                    resources: {
                        food: {
                            changeInfo: {},
                            quantity: 100,
                        },
                        wood: {
                            changeInfo: {},
                            quantity: 100,
                        }
                    },
                }
            ],
            rules: {
                baseCityCapacity: 0,
                buildingUpgradeCoefficient: 0,
                buildingUpgradeCosts: {
                    lumberMill: {
                        wood: 0
                    },
                    pasture: {
                        wood: 0
                    }
                },
                populationGrowthChangeRateCoefficient: 0,
                resourceIncreaseChangeRateCoefficient: 0,
                unitFoodDemand: 0,
                unitStarvingCoefficient: 0,
            },
            time: null,
            worldSizeInTiles: {x: 10, y: 10},
        };
        const expected = [];
        const actual = upgradeBuildingActionValidator({action, state});
        expect(actual).toEqual(expect.arrayContaining(expected));
        expect(actual.length).toEqual(expected.length);
    });

    it('returns error for every insufficient resource', () => {
        const action = {
            type: 'UPGRADE_BUILDING',
            payload: {
                buildingType: 'pasture',
                cityId: '1',
            }
        };
        const state = {
            cities: [
                {
                    id: '1',
                    buildings: {
                        lumberMill: {
                            tier: 0,
                            upgradeCostInfo: {
                                wood: 100,
                            }
                        },
                        pasture: {
                            tier: 0,
                            upgradeCostInfo: {
                                wood: 100,
                            }
                        }
                    },
                    citizens: {
                        peasant: {
                            changeInfo: {},
                            quantity: 0
                        }
                    },
                    location: {x: 0, y: 0},
                    name: 'city1',
                    ownerId: '1',
                    resources: {
                        food: {
                            changeInfo: {},
                            quantity: 100,
                        },
                        wood: {
                            changeInfo: {},
                            quantity: 50,
                        }
                    },
                }
            ],
            rules: {
                baseCityCapacity: 0,
                buildingUpgradeCoefficient: 0,
                buildingUpgradeCosts: {
                    lumberMill: {
                        wood: 0,
                    },
                    pasture: {
                        wood: 0
                    }
                },
                populationGrowthChangeRateCoefficient: 0,
                resourceIncreaseChangeRateCoefficient: 0,
                unitFoodDemand: 0,
                unitStarvingCoefficient: 0,
            },
            time: null,
            worldSizeInTiles: {x: 10, y: 10},
        };
        const expected = ['insufficient wood'];
        const actual = upgradeBuildingActionValidator({action, state});
        expect(actual).toEqual(expect.arrayContaining(expected));
        expect(actual.length).toEqual(expected.length);
    });
});
