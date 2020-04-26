// @flow

import {
    serializeJson,
} from '../../../../common/src/json';
import type {
    ApiGateway,
} from '../../clients/api-gateway/types';
import type {
    ServerResponse,
} from '../../../../common/src/types';

export const sendServerResponse = async ( {
    apiGateway,
    connectionId,
    response,
}: {
    apiGateway: ApiGateway,
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

    return await apiGateway
        .postToConnection(
            {
                ConnectionId: connectionId,
                Data        : serializedResponse,
            },
        )
        .promise();

};
