/**
 * @flow
 */
import type {Reducer} from 'redux';
import {multipleVectors} from '../../../../../common/src/vector';
import {tileSize} from '../root';
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
                        buildings: city.buildings,
                        citizens: city.citizens,
                        id: city.id,
                        name: city.name,
                        geometry: {
                            location: multipleVectors({
                                vector1: city.location,
                                vector2: tileSize,
                            }),
                            size: tileSize,
                        },
                        ownerId: city.ownerId,
                        resources: city.resources,
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
