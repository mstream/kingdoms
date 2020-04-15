// @flow

import {
    actionTransformers,
} from './action-transformers';
import {
    sendMessage,
} from '../utils';
import type {
    ClientAction,
} from '../../../types';
import type {
    CommonPlayerAction,
} from '../../../../../../common/src/state/types';
import type {
    ServerRequest,
} from '../../../../../../common/src/types';
import type {
    Socket,
} from '../types';

export const clientActionHandler = (
    {
        action,
        socket,
        username,
        worldId,
    }: {
    action: ClientAction,
    socket: Socket,
    username: string,
    worldId: string,
},
) => {

    const actionTransformer = actionTransformers[ action.type ];

    if ( actionTransformer == null ) {

        return;

    }

    const commonPlayerAction: CommonPlayerAction = actionTransformer(
        {
            clientAction: action,
            username,
        },
    );

    const request: ServerRequest = {
        action: commonPlayerAction,
        worldId,
    };

    sendMessage(
        {
            request,
            socket,
        },
    );

};
