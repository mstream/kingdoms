/**
 * @flow
 */
import type {Reducer} from 'redux';
import type {ClientStateCities,} from './index';
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
            const citiesByOwnerId = Object.keys(
                state.byId
            ).reduce((citiesByOwnerId, cityId) => {
                const {ownerId} = state.byId[cityId];
                if (ownerId == null) {
                    return citiesByOwnerId;
                }
                return {
                    ...citiesByOwnerId,
                    [ownerId]: [...(citiesByOwnerId[ownerId] != null ? citiesByOwnerId[ownerId] : []), cityId]
                };
            }, EMPTY_OBJECT);

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
