/**
 * @flow
 */
import type {Reducer} from 'redux';
import type {Action} from '../../types';
import type {ClientStateMenu} from '../types';

const initialState: ClientStateMenu = {
    viewedCityId: null
};

export const menuReducer: Reducer<ClientStateMenu, Action> = (state = initialState, action) => {
    switch (action.type) {
        case 'CITY_VIEW_OPENED': {
            return {
                ...state,
                viewedCityId: action.payload,
            };
        }
        case 'CITY_VIEW_CLOSED': {
            return {
                ...state,
                viewedCityId: null,
            };
        }
        default: {
            return state;
        }
    }
};
