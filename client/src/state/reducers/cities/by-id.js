/**
 * @flow
 */
import type {Reducer} from 'redux';
import {multipleVectors} from '../../../../../common/src/vector';
import {tileSize} from '../tiles';
import type {
    ClientStateCities,
    ClientStateCitiesById,
    ClientStateCity,
} from './index';
import type {ClientAction} from '../../actions';

const initialState: ClientStateCities = {
    byId: {},
    byOwnerId: {},
};

export const citiesByIdReducer: Reducer<ClientStateCities, ClientAction> = (
    state = initialState,
    action: ClientAction
) => {
    switch (action.type) {
        case 'UPDATE_STATE': {
            const citiesById: ClientStateCitiesById = Object.keys(action.payload.serverState.cities).reduce(
                (citiesById, cityId) => {
                    const city = action.payload.serverState.cities[cityId];
                    const clientStateCity: ClientStateCity = {
                        ...city,
                        geometry: {
                            location: multipleVectors({
                                vector1: city.location,
                                vector2: tileSize,
                            }),
                            size: tileSize,
                        },
                    };

                    return {
                        ...citiesById,
                        [cityId]: clientStateCity,
                    };
                },
                Object.freeze({})
            );

            return {
                ...state,
                byId: citiesById,
            };
        }
        default: {
            return state;
        }
    }
};
