/**
 * @flow
 */

import {initialState, rootReducer} from './root';
import {resetState, updateState} from '../actions';

describe('rootReducer', () => {
    it('handles reset state action', () => {
        const previousState = undefined;
        const action = resetState();
        const expected = initialState;
        const actual = rootReducer(previousState, action);
        expect(actual).toEqual(expected);
    });
    it('handles update state action', () => {
        const previousState = {
            cities: [
                {
                    buildings: [],
                    citizens: [
                        {
                            type: 'PEASANT',
                            quantity: 1000,
                        }
                    ],
                    id: '1',
                    location: {
                        x: 1,
                        y: 1
                    },
                    name: 'city1',
                    ownerId: '1',
                    resources: [
                        {
                            type: 'FOOD',
                            quantity: 20,
                        },
                        {
                            type: 'WOOD',
                            quantity: 10,
                        }
                    ]
                },
                {
                    buildings: [],
                    citizens: [
                        {
                            type: 'PEASANT',
                            quantity: 500,
                        }
                    ],
                    id: '2',
                    location: {
                        x: 2,
                        y: 2
                    },
                    name: 'city2',
                    ownerId: '2',
                    resources: [
                        {
                            type: 'FOOD',
                            quantity: 10,
                        },
                        {
                            type: 'WOOD',
                            quantity: 0,
                        }
                    ]
                },
            ],
            time: '2000-01-01T00:00:00Z',
            worldSizeInTiles: {x: 10, y: 10}
        };
        const updateTime = '2000-01-01T00:01:40Z';
        const action = updateState({time: updateTime});
        const expected = {
            cities: [
                {
                    buildings: [],
                    citizens: [
                        {
                            type: 'PEASANT',
                            quantity: 1000,
                        }
                    ],
                    id: '1',
                    location: {
                        x: 1,
                        y: 1
                    },
                    name: 'city1',
                    ownerId: '1',
                    resources: [
                        {
                            type: 'FOOD',
                            quantity: 110,
                        },
                        {
                            type: 'WOOD',
                            quantity: 110,
                        }
                    ]
                },
                {
                    buildings: [],
                    citizens: [
                        {
                            type: 'PEASANT',
                            quantity: 500,
                        }
                    ],
                    id: '2',
                    location: {
                        x: 2,
                        y: 2,
                    },
                    name: 'city2',
                    ownerId: '2',
                    resources: [
                        {
                            type: 'FOOD',
                            quantity: 105,
                        },
                        {
                            type: 'WOOD',
                            quantity: 100,
                        }
                    ]
                },
            ],
            time: updateTime,
            worldSizeInTiles: {x: 10, y: 10}
        };
        const actual = rootReducer(previousState, action);
        expect(actual).toEqual(expected);
    });
});