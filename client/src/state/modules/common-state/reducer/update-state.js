// @flow


import type { ClientStateCommonState } from './types';
import type { ClientState } from '../../root';
import type { ClientUpdateStateAction } from '../actions';

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
