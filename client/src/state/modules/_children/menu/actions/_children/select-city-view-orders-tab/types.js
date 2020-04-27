// @flow

import type {
    BaseAction,
} from '../../../../../../../../../common/src/types/actions';


export const SELECT_CITY_VIEW_ORDERS_TAB: 'SELECT_CITY_VIEW_ORDERS_TAB'
    = `SELECT_CITY_VIEW_ORDERS_TAB`;


export type ClientSelectCityViewOrdersTabAction =
    BaseAction< typeof SELECT_CITY_VIEW_ORDERS_TAB,
        $ReadOnly< {| orderId: string |} >, >;
