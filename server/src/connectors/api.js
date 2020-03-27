// @flow

import { stringifyJson } from '../../../common/src/util';
import type { ApiGateway } from '../clients/api-gateway';
import type { ServerResponse } from '../../../common/src/types';

export const sendServerResponse = async ({ apiGateway, connectionId, response }: { apiGateway: ApiGateway, connectionId: string, response: ServerResponse }): Promise<void> => {
    const serializedResponse = stringifyJson({ value: response });

    if (serializedResponse == null) {
        throw Error(`missing server response`);
    }

    return await apiGateway
        .postToConnection({
            ConnectionId: connectionId,
            Data: serializedResponse,
        })
        .promise();
};
