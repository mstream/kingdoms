// @flow

import {
    serializeJson,
} from '../../../../common/src/json';
import type {
    ServerResponse,
} from '../../../../common/src/types';
import type {
    WebSocketApiGateway,
} from '../../clients/api-gateway/types';


export const sendServerResponse = async ( {
    webSocketApiGateway,
    connectionId,
    response,
}: {
    webSocketApiGateway: WebSocketApiGateway,
    connectionId: string,
    response: ServerResponse,
}, ): Promise< void > => {

    const serializedResponse = serializeJson(
        {
            json: response,
        },
    );

    if ( serializedResponse == null ) {

        throw Error(
            `missing server response`,
        );

    }

    return await webSocketApiGateway
        .postToConnection(
            {
                ConnectionId: connectionId,
                Data        : serializedResponse,
            },
        )
        .promise();

};
