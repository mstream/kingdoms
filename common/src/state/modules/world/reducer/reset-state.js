// @flow

import { initialCommonState } from '../../../index';
import type { CommonStateWorld } from './types';
import type { CommonStateActionReducer } from '../../types';
import { success } from '../../utils';
import type { CommonResetStateAction } from '../../../actions/types';

type Reducer = CommonStateActionReducer<CommonStateWorld, CommonResetStateAction>;

export const resetStateWorldReducer: Reducer = (
    {
        action,
        globalState,
        localState,
    },
) => {
    return success({ state: initialCommonState.world });
};
