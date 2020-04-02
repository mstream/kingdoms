// @flow

import { stringifyJson } from '../../../../../common/src/util';
import type { CommonAction } from '../../../../../common/src/state/types';
import type { Socket } from './types';

export const sendMessage = ({
    action,
    socket,
}: {
    action: CommonAction,
    socket: Socket,
}): void => {
    const serializedMessage = stringifyJson({
        value: {
            message: 'sendmessage',
            data: action,
        },
    });

    if (serializedMessage == null) {
        throw Error('cannot send the message');
    }

    socket.send(serializedMessage);
};
