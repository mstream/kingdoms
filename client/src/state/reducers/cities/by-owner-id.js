/**
 * @flow
 */
import type {Reducer} from 'redux';
import type {
    ClientStateCities,
    ClientStateCitiesByOwnerId,
    ClientStateCity,
} from './index';
import {EMPTY_OBJECT} from '../../../../../common/src/util';
import type {ClientAction} from '../../actions';

const initialState: ClientStateCities = {
    byId: EMPTY_OBJECT,
    byOwnerId: EMPTY_OBJECT,
};

export const citiesByOwnerIdReducer: Reducer<ClientStateCities,
    ClientAction> = (
    state = initialState,
    action: ClientAction
) => {
    switch (action.type) {
        case 'UPDATE_STATE': {
            const citiesInNameOrder: $ReadOnlyArray<ClientStateCity> = Object.keys(
                state.byId
            )
                .map(cityId => state.byId[cityId])
                .sort((city1, city2) => {
                    if (city1.name < city2.name) {
                        return -1;
                    }
                    if (city1.name > city2.name) {
                        return 1;
                    }
                    return 0;
                });

            const citiesByOwnerId: ClientStateCitiesByOwnerId = citiesInNameOrder.reduce(
                (citiesByOwnerId, city) => {
                    return {
                        ...citiesByOwnerId,
                        [city.ownerId]: [
                            ...(citiesByOwnerId[city.ownerId] != null
                                ? citiesByOwnerId[city.ownerId]
                                : []),
                            city.id,
                        ],
                    };
                },
                EMPTY_OBJECT
            );

            return {
                ...state,
                byOwnerId: citiesByOwnerId,
            };
        }
        default: {
            return state;
        }
    }
};
