// @flow


import type { ClientStateSelector } from '../../../types';
import type { CommonStateOrders } from '../../../../../../../common/src/state/modules/orders/reducer/types';
import { commonStateOrdersSelectors } from '../../../../../../../common/src/state/modules/orders/selectors';
import { createClientStateCommonStateSelector } from '../utils';

export const ordersSelector: ClientStateSelector<?CommonStateOrders> =
    createClientStateCommonStateSelector({ commonStateSelector: commonStateOrdersSelectors.orders });