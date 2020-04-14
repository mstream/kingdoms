// @flow

import {
    initialCommonState,
} from '../../../../index';
import type {
    CommonStateOrders,
} from '../types';
import type {
    CommonStateActionReducer,
} from '../../../types';
import {
    success,
} from '../../../utils';
import type {
    CommonResetStateAction,
} from '../../../../actions/types';

type Reducer = CommonStateActionReducer< CommonStateOrders,
    CommonResetStateAction, >;

export const resetStateOrdersReducer: Reducer = () => {

    return success(
        {
            state: initialCommonState.orders,
        },
    );

};
