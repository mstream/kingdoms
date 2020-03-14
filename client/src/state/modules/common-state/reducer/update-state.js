// @flow


import type { ClientUpdateStateAction } from '../../../actions';
import type { ClientStateCommonState } from './types';
import type { ClientState } from '../../root';

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
