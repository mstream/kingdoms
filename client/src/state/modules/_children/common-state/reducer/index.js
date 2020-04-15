// @flow

import {
    UPDATE_STATE,
} from '../actions/types';
import {
    createClientStateReducer,
} from '../../../../utils';
import {
    initialClientState,
} from '../../../../state';
import {
    updateStateCommonStateReducer,
} from './_impl/update-state';
import type {
    ClientStateCommonState,
} from './types';

export const commonStateReducer = createClientStateReducer<ClientStateCommonState>(
    {
        actionReducers: {
            [ UPDATE_STATE ]: updateStateCommonStateReducer,
        },
        initialState: initialClientState.commonState,
    },
);
