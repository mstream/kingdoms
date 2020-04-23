// @flow

import {
    ordersSelector,
} from './_impl/orders';
import type {
    CommonStateSelectors,
} from '../../../types';

export const commonStateOrdersSelectors: CommonStateSelectors = {
    orders: ordersSelector,
};
