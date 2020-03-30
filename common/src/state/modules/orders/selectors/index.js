// @flow

import { ordersSelector } from './_impl/orders';
import type { CommonStateRegimentTemplate } from '../reducer/types';
import type { CommonStateUnitKey } from '../../rules/reducer/types';

export const commonStateOrdersSelectors = {
    orders: ordersSelector,
};
