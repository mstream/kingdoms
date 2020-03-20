// @flow

import {parseJson, stringifyJson} from '../../../common/src/util';
import type {Redis} from '../clients/redis';
import type {ApiGateway} from '../clients/api-gateway';
import type { ServerResponse } from '../../../common/src/types';
import type { CommonState } from '../../../common/src/state/modules/types';
import { CommonStateType } from '../../../common/src/state/modules/types';

export const sendServerResponse = async ({apiGateway, connectionId, response}: { apiGateway: ApiGateway, connectionId: string, response: ServerResponse }): Promise<void> => {
    const serializedResponse = stringifyJson({value: response});

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
