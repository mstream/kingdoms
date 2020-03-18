// @flow

import type { ClientAction } from '../actions';
import type { ClientState } from './types';

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
