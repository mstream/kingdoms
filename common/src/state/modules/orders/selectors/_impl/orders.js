// @flow

import type { CommonStateSelector } from '../../../types';
import type { CommonStateOrders } from '../../reducer/types';

export const ordersSelector: CommonStateSelector<CommonStateOrders> = (
    state,
) => {
    return state.orders;
};
