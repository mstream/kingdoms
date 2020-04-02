// @flow

import type { ClientAction } from '../../../types';
import type { Socket } from '../types';
import type { CommonAction } from '../../../../../../common/src/state/types';
import { actionTransformers } from './action-transformers';
import { sendMessage } from '../utils';

export const clientActionHandler = ({
    action,
    socket,
    username,
}: {
    action: ClientAction,
    socket: Socket,
    username: string,
}) => {
    const actionTransformer = actionTransformers[action.type];

    if (actionTransformer == null) {
        return;
    }

    const commonAction: CommonAction = actionTransformer({
        clientAction: action,
        username,
    });

    sendMessage({
        action: commonAction,
        socket,
    });
};
