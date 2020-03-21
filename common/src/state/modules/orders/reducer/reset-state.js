// @flow

import { initialCommonState } from '../../../index';
import type { CommonStateOrders } from './types';
import type { CommonState, CommonStateReducerResult } from '../../types';
import { success } from '../../utils';
import type { CommonResetStateAction } from '../../../actions/types';

export const resetStateOrdersReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: CommonResetStateAction,
        globalState: CommonState,
        localState: CommonStateOrders,
    },
): CommonStateReducerResult<CommonStateOrders> => {
    return success({ state: initialCommonState.orders });
};
