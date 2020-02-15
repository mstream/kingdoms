/**
 * @flow
 */

import type {ServerState} from '../../common/src/types';

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
                    quantity: 100
                },
                {
                    type: 'WOOD',
                    quantity: 200
                },
            ]
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
                    quantity: 50
                },
                {
                    type: 'WOOD',
                    quantity: 100
                },
            ]
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
                    quantity: 25
                },
                {
                    type: 'WOOD',
                    quantity: 50
                },
            ]
        },
    ],
    worldSizeInTiles: {
        x: 30,
        y: 30
    }
};

export const updateState = ({state}: { state: ServerState } = {state: initialState}): ServerState => {
    const newCities = state.cities.map((city) => {
        const newResources = city.resources.map((resource) => {
            return {
                ...resource,
                quantity: resource.quantity + 1
            };
        });
        return {
            ...city,
            resources: newResources
        };
    });
    return {
        ...state,
        cities: newCities
    };
};