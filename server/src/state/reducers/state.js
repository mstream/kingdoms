/**
 * @flow
 */

import type {ServerState} from '../../../../common/src/state';

export const initialState: ServerState = {
    cities: [
        {
            buildings: {
                pasture: {
                    tier: 2,
                    upgradeCostInfo: {},
                },
                lumberMill: {
                    tier: 1,
                    upgradeCostInfo: {},
                }
            },
            citizens: {
                peasant: {
                    changeInfo: {},
                    quantity: 3000
                }
            },
            id: '1',
            name: 'city1',
            location: {
                x: 0,
                y: 0,
            },
            ownerId: '1',
            resources: {
                food:
                    {
                        changeInfo: {},
                        quantity: 100,
                    },
                wood:
                    {
                        changeInfo: {},
                        quantity: 200,
                    },
            },
        },
        {
            buildings: {
                pasture: {
                    tier: 2,
                    upgradeCostInfo: {},
                },
                lumberMill: {
                    tier: 0,
                    upgradeCostInfo: {},
                }
            },
            citizens: {
                peasant: {
                    changeInfo: {},
                    quantity: 2000,
                }
            },
            id: '2',
            name: 'city2',
            location: {
                x: -3,
                y: -3,
            },
            ownerId: '1',
            resources: {
                food:
                    {
                        changeInfo: {},
                        quantity: 50,
                    },
                wood:
                    {
                        changeInfo: {},
                        quantity: 100,
                    },
            },
        },
        {
            buildings: {
                pasture: {
                    tier: 0,
                    upgradeCostInfo: {},
                },
                lumberMill: {
                    tier: 0,
                    upgradeCostInfo: {},
                }
            },
            citizens: {
                peasant: {
                    changeInfo: {},
                    quantity: 1000
                }
            },
            id: '3',
            name: 'city3',
            location: {
                x: 3,
                y: 3,
            },
            ownerId: '1',
            resources: {
                food:
                    {
                        changeInfo: {},
                        quantity: 25,
                    },
                wood:
                    {
                        changeInfo: {},
                        quantity: 50,
                    },
            },
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
    time: null,
    worldSizeInTiles: {
        x: 30,
        y: 30,
    },
};
