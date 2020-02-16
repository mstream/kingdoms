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
        case 'STATE_UPDATE_SCHEDULED': {
            const stateTime = state.time;

            if (stateTime == null) {
                return {
                    ...state,
                    time: action.payload,
                };
            }

            const timeDelta = Date.parse(action.payload) - Date.parse(stateTime);

            if (timeDelta <= 0) {
                console.error(`the time from action ${action.payload} is not past the time from the state ${stateTime}`);
                return state;
            }

            const resourceIncrease = Math.floor(timeDelta / 1000);

            const newCities = state.cities.map(city => {
                const newResources = city.resources.map(resource => {
                    return {
                        ...resource,
                        quantity: resource.quantity + resourceIncrease,
                    };
                });
                return {
                    ...city,
                    resources: newResources,
                };
            });
            return {
                ...state,
                cities: newCities,
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
