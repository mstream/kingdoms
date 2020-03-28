// @flow

import type { ClientStateCommonState } from './types';
import { initialClientState } from '../../../../state';
import { UPDATE_STATE } from '../actions/types';
import { updateStateCommonStateReducer } from './_impl/update-state';
import { createClientStateReducer } from '../../../../utils';

export const commonStateReducer = createClientStateReducer<ClientStateCommonState>({
    actionReducers: {
        [UPDATE_STATE]: updateStateCommonStateReducer,
    },
    initialState: initialClientState.commonState,
});