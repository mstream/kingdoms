// @flow

import { CREATE_ORDER } from './types';
import type { CommonCreateOrderAction } from './types';
import type { CommonActionCreator } from '../../../types';

export const createOrder: CommonActionCreator<CommonCreateOrderAction> = (payload) => {
    return {
        type: CREATE_ORDER,
        payload,
    };
};
