// @flow

import type { ClientState, ClientStateMenu } from '../../state';
import { initialClientState } from '../../state';
import type { ClientCloseCityViewAction } from '../../actions';

export const closeCityViewMenuReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientCloseCityViewAction,
            globalState: ClientState,
        },
): ClientStateMenu => {
    return {
        ...localState,
        cityView: initialClientState.menu.cityView,
    };
};
