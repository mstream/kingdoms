// @flow

import {
    initialCommonState,
} from '../../../../../index';
import {
    success,
} from '../../../../utils';
import type {
    CommonResetStateAction,
} from '../../../../../actions/types';
import type {
    CommonStateActionReducer,
} from '../../../../types';
import type {
    CommonStateOrders,
} from '../types';

type Reducer = CommonStateActionReducer< CommonStateOrders,
    CommonResetStateAction, >;

export const resetStateOrdersReducer: Reducer = () => {

    return success(
        {
            state: initialCommonState.orders,
        },
    );

};
