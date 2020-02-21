/**
 * @flow
 */

import {rootReducer} from './root';
import {initialState} from './state';
import {executeTimeStep, resetState} from '../../../../common/src/actions';

describe('rootReducer', () => {
    it('handles reset state action', () => {
        const previousState = undefined;
        const action = resetState();
        const expected = initialState;
        const actual = rootReducer(previousState, action);
        expect(actual).toEqual(expected);
    });

    it('handles execute time step action 1', () => {
        const previousState = {
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
                        peasant: {
                            quantity: 1000,
                        }
                    },
                    id: '1',
                    location: {
                        x: 1,
                        y: 1
                    },
                    name: 'city1',
                    ownerId: '1',
                    resources: {
                        food: {
                            quantity: 2000,
                        },
                        wood: {
                            quantity: 1000,
                        }
                    }
                },
            ],
            time: '2000-01-01T00:00:00Z',
            worldSizeInTiles: {x: 10, y: 10}
        };
        const updateTime = '2000-01-01T01:00:00Z';
        const action = executeTimeStep({time: updateTime});
        const expected = {
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
                        peasant: {
                            changeInfo: {
                                'growth rate': 666.6666666666667
                            },
                            quantity: 1666,
                        }
                    },
                    id: '1',
                    location: {
                        x: 1,
                        y: 1
                    },
                    name: 'city1',
                    ownerId: '1',
                    resources: {
                        food: {
                            changeInfo: {
                                'pasture production': 10000,
                                'citizens maintenance': -1000,
                            },
                            quantity: 11000,
                        },
                        wood: {
                            changeInfo: {
                                'lumber mill production': 10000,
                            },
                            quantity: 11000,
                        }
                    }
                }
            ],
            time: updateTime,
            worldSizeInTiles: {x: 10, y: 10}
        };
        const actual = rootReducer(previousState, action);
        expect(actual).toEqual(expected);
    });

    it('handles execute time step action 2', () => {
        const previousState = {
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
                        peasant: {
                            quantity: 500,
                        }
                    },
                    id: '2',
                    location: {
                        x: 2,
                        y: 2
                    },
                    name: 'city2',
                    ownerId: '2',
                    resources: {
                        food: {
                            quantity: 1000,
                        },
                        wood: {
                            quantity: 0,
                        }
                    }
                },
            ],
            time: '2000-01-01T00:00:00Z',
            worldSizeInTiles: {x: 10, y: 10}
        };
        const updateTime = '2000-01-01T01:00:00Z';
        const action = executeTimeStep({time: updateTime});
        const expected = {
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
                        peasant: {
                            changeInfo: {
                                'growth rate': 437.5
                            },
                            quantity: 937,
                        }
                    },
                    id: '2',
                    location: {
                        x: 2,
                        y: 2,
                    },
                    name: 'city2',
                    ownerId: '2',
                    resources: {
                        food: {
                            changeInfo: {
                                'pasture production': 10000,
                                'citizens maintenance': -500,
                            },
                            quantity: 10500,
                        },
                        wood: {
                            changeInfo: {
                                'lumber mill production': 20000,
                            },
                            quantity: 20000,
                        }
                    }
                },
            ],
            time: updateTime,
            worldSizeInTiles: {x: 10, y: 10}
        };
        const actual = rootReducer(previousState, action);
        expect(actual).toEqual(expected);
    });

    it('handles execute time step action 3', () => {
        const previousState = {
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
                        peasant: {
                            quantity: 2000,
                        }
                    },
                    id: '3',
                    location: {
                        x: 2,
                        y: 2,
                    },
                    name: 'city3',
                    ownerId: '3',
                    resources: {
                        food: {
                            quantity: 1000,
                        },
                        wood: {
                            quantity: 1000,
                        }
                    }
                },
            ],
            time: '2000-01-01T00:00:00Z',
            worldSizeInTiles: {x: 10, y: 10}
        };
        const updateTime = '2000-01-01T01:00:00Z';
        const action = executeTimeStep({time: updateTime});
        const expected = {
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
                        peasant: {
                            changeInfo: {
                                'growth rate': -500
                            },
                            quantity: 1500,
                        }
                    },
                    id: '3',
                    location: {
                        x: 2,
                        y: 2,
                    },
                    name: 'city3',
                    ownerId: '3',
                    resources: {
                        food: {
                            changeInfo: {
                                'pasture production': 0,
                                'citizens maintenance': -2000,
                            },
                            quantity: 0,
                        },
                        wood: {
                            changeInfo: {
                                'lumber mill production': 10000,
                            },
                            quantity: 11000,
                        }
                    }
                },
            ],
            time: updateTime,
            worldSizeInTiles: {x: 10, y: 10}
        };
        const actual = rootReducer(previousState, action);
        expect(actual).toEqual(expected);
    });
});
