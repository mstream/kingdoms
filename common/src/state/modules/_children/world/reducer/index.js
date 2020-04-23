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
    resetStateWorldReducer,
} from './_impl/reset-state';
import type {
    CommonStateWorld,
} from './types';

export const worldReducer = createCommonStateReducer<CommonStateWorld>(
    {
        actionReducers: {
            [ RESET_STATE ]: resetStateWorldReducer,
        },
        initialState: initialCommonState.world,
    },
);
