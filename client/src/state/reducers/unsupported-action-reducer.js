// @flow

import type { ClientState } from '../state';

export const unsupportedActionReducer = <S, A>(
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: S,
            action: A,
            globalState: ClientState,
        },
): S => {
    return localState;
};
