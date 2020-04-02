// @flow

import { initialCommonState } from '../../../index';
import type { CommonStateRules } from './types';
import { resetStateRulesReducer } from './reset-state';
import { RESET_STATE } from '../../../actions/types';
import { createCommonStateReducer } from '../../utils';

export const rulesReducer = createCommonStateReducer<CommonStateRules>({
    actionReducers: {
        [RESET_STATE]: resetStateRulesReducer,
    },
    initialState: initialCommonState.rules,
});
