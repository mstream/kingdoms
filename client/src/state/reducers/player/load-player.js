// @flow


import type { ClientLoadPlayerAction } from '../../actions';
import type { ClientState, ClientStatePlayer } from '../../state';

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
