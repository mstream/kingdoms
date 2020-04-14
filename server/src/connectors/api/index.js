// @flow

import type {
    ServerResponse,
} from '../../../../common/src/types';
import type {
    ApiGateway,
} from '../../clients/api-gateway/types';
import {
    stringifyJson,
} from '../../../../common/src/json';

export const sendServerResponse = async ( {
    apiGateway,
    connectionId,
    response,
}: {
    apiGateway: ApiGateway,
    connectionId: string,
    response: ServerResponse,
}, ): Promise< void > => {

    const serializedResponse = stringifyJson(
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
