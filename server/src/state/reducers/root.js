/**
 * @flow
 */

import type {Reducer} from 'redux';
import type {ServerAction} from '../actions';
import type {ServerState} from '../../../../common/src/types';
import reduceReducers from 'reduce-reducers';
import {globalReducer} from '../../../../client/src/state/reducers/global';

export const initialState: ServerState = {
    cities: [
        {
            buildings: [
                {
                    type: 'PASTURE',
                    tier: 2,
                },
                {
                    type: 'LUMBER_MILL',
                    tier: 1,
                }
            ],
            citizens: [
                {
                    type: 'PEASANT',
                    quantity: 3000
                }
            ],
            id: '1',
            name: 'city1',
            location: {
                x: 0,
                y: 0,
            },
            ownerId: '1',
            resources: [
                {
                    type: 'FOOD',
                    quantity: 100,
                },
                {
                    type: 'WOOD',
                    quantity: 200,
                },
            ],
        },
        {
            buildings: [
                {
                    type: 'PASTURE',
                    tier: 1,
                }
            ],
            citizens: [
                {
                    type: 'PEASANT',
                    quantity: 2000
                }
            ],
            id: '2',
            name: 'city2',
            location: {
                x: -3,
                y: -3,
            },
            ownerId: '1',
            resources: [
                {
                    type: 'FOOD',
                    quantity: 50,
                },
                {
                    type: 'WOOD',
                    quantity: 100,
                },
            ],
        },
        {
            buildings: [],
            citizens: [
                {
                    type: 'PEASANT',
                    quantity: 1000
                }
            ],
            id: '3',
            name: 'city3',
            location: {
                x: 3,
                y: 3,
            },
            ownerId: '1',
            resources: [
                {
                    type: 'FOOD',
                    quantity: 25,
                },
                {
                    type: 'WOOD',
                    quantity: 50,
                },
            ],
        },
    ],
    time: null,
    worldSizeInTiles: {
        x: 30,
        y: 30,
    },
};

const combinedReducer: Reducer<ServerState, ServerAction> = (state = initialState, action) => {
    switch (action.type) {
        case 'STATE_RESET': {
            return initialState;
        }
        case 'STATE_UPDATED': {
            const stateTime = state.time;

            if (stateTime == null) {
                return {
                    ...state,
                    time: action.payload,
                };
            }

            const timeDelta = (Date.parse(action.payload) - Date.parse(stateTime)) / 1000;

            if (timeDelta <= 0) {
                console.error(`the time from action ${action.payload} is not past the time from the state ${stateTime}`);
                return state;
            }

            const resourceIncreaseRate = 1;
            const unitFoodDemand = 0.0001;

            const newCities = state.cities.map(city => {
                const pasture = city.buildings.find(building => building.type === 'PASTURE');
                const lumberMill = city.buildings.find(building => building.type === 'LUMBER_MILL');
                const newResources = city.resources.map(resource => {
                    switch (resource.type) {
                        case 'FOOD': {
                            const pastureTier = pasture != null ? pasture.tier : 0;
                            const increaseRate = resourceIncreaseRate * pastureTier;
                            const decreaseRate = city.citizens[0].quantity * unitFoodDemand;
                            const delta = timeDelta * (increaseRate - decreaseRate);
                            return {
                                ...resource,
                                quantity: resource.quantity + delta
                            };
                        }
                        case 'WOOD': {
                            const lumberMillTier = lumberMill != null ? lumberMill.tier : 0;
                            const increaseRate = resourceIncreaseRate * lumberMillTier;
                            const decreaseRate = 0;
                            const delta = timeDelta * (increaseRate - decreaseRate);
                            return {
                                ...resource,
                                quantity: resource.quantity + delta
                            };
                        }
                        default: {
                            console.error(`unsupported resource type: ${resource.type}`);
                            return resource;
                        }
                    }
                });

                const newCitizens = city.citizens.map(citizen => {
                    switch (citizen.type) {
                        case 'PEASANT': {
                            const cityCapacity = 10000;
                            const populationGrowthCoefficient = 0.0001;
                            const delta = timeDelta * populationGrowthCoefficient * citizen.quantity * (1 - (citizen.quantity / cityCapacity));
                            return {
                                ...citizen,
                                quantity: citizen.quantity + Math.floor(delta),
                            };
                        }
                        default: {
                            return citizen;
                        }
                    }
                });

                return {
                    ...city,
                    citizens: newCitizens,
                    resources: newResources,
                };
            });
            return {
                ...state,
                cities: newCities,
                time: action.payload
            };
        }
        default: {
            return state;
        }
    }
};


export const rootReducer: Reducer<ServerState, ServerAction> = reduceReducers(
    combinedReducer,
    globalReducer,
);
