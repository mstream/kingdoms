// @flow

import { initialCommonState } from '../../../index';
import type { CommonStateWorld } from './types';
import { resetStateWorldReducer } from './reset-state';
import { RESET_STATE } from '../../../actions/types';
import { createCommonStateReducer } from '../../utils';

export const worldReducer = createCommonStateReducer<CommonStateWorld>({
    actionReducers: {
        [RESET_STATE]: resetStateWorldReducer,
    },
    initialState: initialCommonState.world,
});
