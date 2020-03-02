// @flow
import type {Reducer} from 'redux';
import type {ClientAction} from '../actions';

export type ClientStateMenu = {
    isCityBeingCreated: boolean,
    viewedCityId: ?string,
};

const initialState: ClientStateMenu = {
    isCityBeingCreated: false,
    viewedCityId: null,
};

export const menuReducer: Reducer<ClientStateMenu, ClientAction> = (
    state = initialState,
    action: ClientAction
) => {
    switch (action.type) {
        case 'REQUEST_CITY_CREATION': {
            return {
                ...state,
                isCityBeingCreated: true,
            };
        }
        case 'CLOSE_CITY_VIEW': {
            return {
                ...state,
                viewedCityId: null,
            };
        }
        case 'OPEN_CITY_VIEW': {
            return {
                ...state,
                viewedCityId: action.payload.cityId,
            };
        }
        default: {
            return state;
        }
    }
};
