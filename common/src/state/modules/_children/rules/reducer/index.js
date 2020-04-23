// @flow

import {
    RESET_STATE,
} from '../../../../actions/types';
import {
    createCommonStateReducer,
} from '../../../utils';
import {
    initialCommonState,
} from '../../../../index';
import {
    resetStateRulesReducer,
} from './_impl/reset-state';
import type {
    CommonStateRules,
} from './types';

export const rulesReducer = createCommonStateReducer<CommonStateRules>(
    {
        actionReducers: {
            [ RESET_STATE ]: resetStateRulesReducer,
        },
        initialState: initialCommonState.rules,
    },
);
