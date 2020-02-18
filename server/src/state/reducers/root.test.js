/**
 * @flow
 */

import {rootReducer} from './root';
import {resetState, updateState} from '../actions';
import {initialState} from './state';

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
                {
                    buildings: {
                        lumberMill: {
                            tier: 0,
                        },
                        pasture: {
                            tier: 0
                        }
                    },
                    citizens: {
                        peasant: {
                            quantity: 10000,
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
        const action = updateState({time: updateTime});
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
                            quantity: 1900,
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
                },
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
                            quantity: 975,
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
                {
                    buildings: {
                        lumberMill: {
                            tier: 0,
                        },
                        pasture: {
                            tier: 0
                        }
                    },
                    citizens: {
                        peasant: {
                            quantity: 10000,
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
                                'citizens maintenance': -10000,
                            },
                            quantity: 0,
                        },
                        wood: {
                            changeInfo: {
                                'lumber mill production': 0,
                            },
                            quantity: 1000,
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