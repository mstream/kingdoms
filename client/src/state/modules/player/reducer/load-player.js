// @flow


import type { ClientStatePlayer } from './types';
import type { ClientLoadPlayerAction } from '../actions';
import type { ClientState } from '../../types';

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
