// @flow

import type { ClientState } from './types';
import type { ClientAction } from '../types';

export const unsupportedActionReducer = <S, A: ClientAction>(
    {
        localState,
        action,
        globalState,
    }: {
            localState: S,
            action: A,
            globalState: ClientState,
        },
): S => {
    return localState;
};
