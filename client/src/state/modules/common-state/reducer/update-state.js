// @flow


import type { ClientStateCommonState } from './types';
import type { ClientState } from '../../types';
import type { ClientUpdateStateAction } from '../actions/types';

export const updateStateCommonStateReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: ClientUpdateStateAction,
        globalState: ClientState,
        localState: ClientStateCommonState,
    },
): ClientStateCommonState => {
    return action.payload.commonState;
};
