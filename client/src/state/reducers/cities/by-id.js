/**
 * @flow
 */
import type {Reducer} from 'redux';
import {multipleVectors} from '../../../../../common/src/vector';
import {tileSize} from '../tiles';
import {EMPTY_OBJECT} from '../../../../../common/src/util';
import type {
    ClientStateCities,
    ClientStateCitiesById,
    ClientStateCity,
} from './index';
import type {ClientAction} from '../../actions';

const initialState: ClientStateCities = {
    byId: EMPTY_OBJECT,
    byOwnerId: EMPTY_OBJECT,
};

export const citiesByIdReducer: Reducer<ClientStateCities, ClientAction> = (
    state = initialState,
    action: ClientAction
) => {
    switch (action.type) {
        case 'UPDATE_STATE': {
            const citiesById: ClientStateCitiesById = action.payload.serverState.cities.reduce(
                (citiesById, city) => {
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
                        [city.id]: clientStateCity,
                    };
                },
                EMPTY_OBJECT
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
