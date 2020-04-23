// @flow

import {
    commonStateOrdersSelectors,
} from '../../../../../../../../common/src/state/modules/_children/orders/selectors';
import {
    createClientStateCommonStateSelector,
} from '../utils';
import type {
    ClientStateSelector,
} from '../../../../../types';
import type {
    CommonStateOrders,
} from '../../../../../../../../common/src/state/modules/_children/orders/reducer/types';

export const ordersSelector: ClientStateSelector< ?CommonStateOrders, void >
    = createClientStateCommonStateSelector(
        {
            commonStateSelector: commonStateOrdersSelectors.orders,
        },
    );
