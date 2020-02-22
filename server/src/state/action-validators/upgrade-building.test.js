/**
 * @flow
 */

import {validateUpgradeBuildingAction} from './upgrade-building';

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
        const actual = validateUpgradeBuildingAction({action, state});
        expect(actual).toEqual(expect.arrayContaining(expected));
        expect(actual.length).toEqual(expected.length);
    });

    it('returns no errors when all availableResources are sufficient', () => {
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
        const actual = validateUpgradeBuildingAction({action, state});
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
        const expected = ['insufficient wood'];
        const actual = validateUpgradeBuildingAction({action, state});
        expect(actual).toEqual(expect.arrayContaining(expected));
        expect(actual.length).toEqual(expected.length);
    });
});
