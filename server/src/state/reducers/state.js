/**
 * @flow
 */

import type {ServerState} from '../../../../common/src/state';

export const initialState: ServerState = {
    cities: [
        {
            buildings: {
                pasture: {
                    tier: 2
                },
                lumberMill: {
                    tier: 1
                }
            },
            citizens: {
                peasant: {
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
                        quantity: 100,
                    },
                wood:
                    {
                        quantity: 200,
                    },
            },
        },
        {
            buildings: {
                pasture: {
                    tier: 2
                },
                lumberMill: {
                    tier: 0
                }
            },
            citizens: {
                peasant: {
                    quantity: 2000
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
                        quantity: 50,
                    },
                wood:
                    {
                        quantity: 100,
                    },
            },
        },
        {
            buildings: {
                pasture: {
                    tier: 0
                },
                lumberMill: {
                    tier: 0
                }
            },
            citizens: {
                peasant: {
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
                        quantity: 25,
                    },
                wood:
                    {
                        quantity: 50,
                    },
            },
        },
    ],
    time: null,
    worldSizeInTiles: {
        x: 30,
        y: 30,
    },
};
