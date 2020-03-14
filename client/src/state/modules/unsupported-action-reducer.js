// @flow

import type { ClientState } from './root';

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
