// @flow

import type {
    CommonStateOrders,
} from '../../reducer/types';
import type {
    CommonStateSelector,
} from '../../../../types';

export const ordersSelector: CommonStateSelector< CommonStateOrders, void > = (
    state,
) => {

    return state.orders;

};
