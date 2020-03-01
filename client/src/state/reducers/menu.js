// @flow
import type { Reducer } from 'redux';
import type { ClientAction } from '../actions';

export type ClientStateMenu = {
    viewedCityId: ?string,
};

const initialState: ClientStateMenu = {
    viewedCityId: null,
};

export const menuReducer: Reducer<ClientStateMenu, ClientAction> = (
    state = initialState,
    action: ClientAction
) => {
    switch (action.type) {
        case 'OPEN_CITY_VIEW': {
            return {
                ...state,
                viewedCityId: action.payload.cityId,
            };
        }
        case 'CLOSE_CITY_VIEW': {
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
