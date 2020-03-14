// @flow


import type { ClientStatePlayer } from './types';
import type { ClientState } from '../../root';
import type { ClientLoadPlayerAction } from '../actions';

export const loadPlayerPlayerReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: ClientLoadPlayerAction,
        globalState: ClientState,
        localState: ClientStatePlayer,
    },
): ClientStatePlayer => {
    return {
        ...localState,
        name: action.payload.name,
    };
};
