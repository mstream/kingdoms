// @flow


import type { ClientStateCommonState } from '../types';
import type { ClientStateActionReducer } from '../../../types';
import type { ClientUpdateStateAction } from '../../actions/types';

type Reducer = ClientStateActionReducer<ClientStateCommonState, ClientUpdateStateAction>;

export const updateStateCommonStateReducer: Reducer = (
    {
        action,
        globalState,
        localState,
    },
) => {
    return action.payload.commonState;
};
