// @flow

import {
    getCurrentState,
} from '../../../../../../../common/src/state/actions';
import type {
    ClientStore,
} from '../../../../types';
import type {
    Socket,
} from '../../types';
import {
    clientActions,
} from '../../../../modules/actions';
import {
    sendMessage,
} from '../../utils';
import type {
    ServerRequest,
} from '../../../../../../../common/src/types';
import type {
    Logger,
} from '../../../../../../../common/src/logging/types';

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
            `Websocket connection established`,
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
