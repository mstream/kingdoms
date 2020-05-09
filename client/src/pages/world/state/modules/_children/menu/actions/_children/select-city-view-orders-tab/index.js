// @flow

import {
    SELECT_CITY_VIEW_ORDERS_TAB,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientSelectCityViewOrdersTabAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientSelectCityViewOrdersTabAction >;

export const selectCityViewOrdersTab: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: SELECT_CITY_VIEW_ORDERS_TAB,
    };

};
