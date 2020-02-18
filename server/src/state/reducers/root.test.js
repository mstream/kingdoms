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
                            quantity: 20,
                        },
                        wood: {
                            quantity: 10,
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
                            quantity: 10,
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
                            quantity: 10,
                        },
                        wood: {
                            quantity: 10,
                        }
                    }
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
                            quantity: 1009,
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
                            quantity: 110,
                        },
                        wood: {
                            quantity: 110,
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
                            quantity: 504,
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
                            quantity: 105,
                        },
                        wood: {
                            quantity: 200,
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
                            quantity: 0,
                        },
                        wood: {
                            quantity: 10,
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