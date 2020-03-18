// @flow


import type { ClientStateCommonState } from './types';
import type { ClientUpdateStateAction } from '../actions';
import type { ClientState } from '../../types';

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
