// @flow

import type { ClientState, ClientStateMenu } from '../../state';
import { initialClientState } from '../../state';
import type { ClientCloseAttackViewAction } from '../../actions';

export const closeAttackViewMenuReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientCloseAttackViewAction,
            globalState: ClientState,
        },
): ClientStateMenu => {
    return {
        ...localState,
        attackView: initialClientState.menu.attackView,
    };
};
