/**
 * @flow
 */
import type { Reducer } from 'redux';
import { multipleVectors } from '../../../../../common/src/vector';
import { tileSize } from '../root';
import { EMPTY_OBJECT } from '../../../../../common/src/util';
import type {
    ClientStateCities,
    ClientStateCitiesById,
    ClientStateCity,
} from './index';
import type { ClientAction } from '../../actions';

const initialState: ClientStateCities = {
    byId: EMPTY_OBJECT,
    byOwnerId: EMPTY_OBJECT,
};

export const citiesByIdReducer: Reducer<ClientStateCities, ClientAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case 'SERVER_STATE_UPDATED': {
            const citiesById: ClientStateCitiesById = action.payload.cities.reduce(
                (citiesById, city) => {
                    const clientStateCity: ClientStateCity = {
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
