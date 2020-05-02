// @flow

import {
    clientActions,
} from '../../../../modules/actions';
import {
    getCurrentState,
} from '../../../../../../../common/src/state/actions';
import {
    sendMessage,
} from '../../utils';
import type {
    ClientStore,
} from '../../../../types';
import type {
    Logger,
} from '../../../../../../../common/src/logging/types';
import type {
    ServerRequest,
} from '../../../../../../../common/src/types';
import type {
    Socket,
} from '../../types';

export const createOnConnectHandler = (
    {
        logger,
        socket,
        store,
        username,
        worldId,
    }: {
        logger: Logger,
    socket: Socket,
    store: ClientStore,
    username: string,
    worldId: string,
},
) => {

    return (): void => {

        logger.info(
            {
                message: `Websocket connection established`,
            },

        );

        const request: ServerRequest = {
            action: getCurrentState(
                {
                    playerId: username,
                },
            ),
            worldId,
        };

        sendMessage(
            {
                request,
                socket,
            },
        );

        store.dispatch(
            clientActions.player.loadPlayer(
                {
                    name: username,
                },
            ),
        );

    };

};
