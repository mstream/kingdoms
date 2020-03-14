// @flow


import { LOAD_PLAYER } from '../../actions';
import { loadPlayerPlayerReducer } from './load-player';
import { unsupportedActionReducer } from '../unsupported-action-reducer';
import type {
    ClientState,
    ClientStateMenu,
    ClientStatePlayer,
} from '../../state';
import type { ClientAction } from '../../actions';
import { initialClientState } from '../../state';
import type { ClientStateReducerTestScenario } from '../root';

export type ClientStatePlayerReducerTestScenario<A: ClientAction> = ClientStateReducerTestScenario<ClientStatePlayer, A>;

export const playerReducer = (
    localState: ClientStatePlayer = initialClientState.player,
    action: ClientAction,
    globalState: ClientState,
): ClientStatePlayer => {
    switch (action.type) {
        case LOAD_PLAYER: {
            return loadPlayerPlayerReducer({
                action,
                globalState,
                localState,
            });
        }
        default: {
            return unsupportedActionReducer({
                action,
                globalState,
                localState,
            });
        }
    }
};
