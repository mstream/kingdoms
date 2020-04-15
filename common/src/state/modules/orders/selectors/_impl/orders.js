// @flow

import type {
    CommonStateOrders,
} from '../../reducer/types';
import type {
    CommonStateSelector,
} from '../../../types';

export const ordersSelector: CommonStateSelector< CommonStateOrders > = (
    state,
) => {

    return state.orders;

};
