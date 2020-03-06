// @flow

import {parseJson, stringifyJson} from '../../../common/src/util';
import type {ServerState} from '../../../common/src/state';
import {ServerStateType} from '../../../common/src/state';
import type {Redis} from '../clients/redis';
import type {ServerResponse} from '../../../common/src/actions';
import type {ApiGateway} from '../clients/api-gateway';

export const getState = async ({redis}: { redis: Redis }): Promise<ServerState> => {
    const serializedState = await redis.get('state');
    const stateObject = parseJson({json: serializedState});
    return ServerStateType.assert(stateObject);
};

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
