// @flow

import {
    serializeJson,
} from '../../../../../../../common/src/json';
import type {
    ServerRequest,
} from '../../../../../../../common/src/types';
import type {
    Socket,
} from './types';

export const sendMessage = (
    {
        request,
        socket,
    }: {
    request: ServerRequest,
    socket: Socket,
},
): void => {

    const serializedMessage = serializeJson(
        {
            json: {
                data   : request,
                message: `sendmessage`,
            },
        },
    );

    if ( serializedMessage == null ) {

        throw Error(
            `cannot send the message`,
        );

    }

    socket.send(
        serializedMessage,
    );

};
