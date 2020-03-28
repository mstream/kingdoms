// @flow

import { getCurrentState } from '../../../../../../common/src/state/actions';
import type { ClientStore } from '../../../types';
import type { Socket } from '../types';
import { clientActions } from '../../../modules/actions';
import { sendMessage } from '../utils';

export const createOnConnectHandler = (
    {
        socket,
        store,
        username,
    }: {
        socket: Socket,
        store: ClientStore,
        username: string,
    },
) => {
    return (): void => {
        console.log(`ws connection established`);

        sendMessage({
            action: getCurrentState({ playerId: username }),
            socket,
        });

        store.dispatch(clientActions.player.loadPlayer({ name: username }));
    };
};
