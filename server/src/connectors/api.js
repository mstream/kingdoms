// @flow

import {parseJson, stringifyJson} from '../../../common/src/util';
import type {Redis} from '../clients/redis';
import type {ServerResponse} from '../../../common/src/actions';
import type {ApiGateway} from '../clients/api-gateway';
import { CommonStateType } from '../../../common/src/state';
import type { CommonState } from '../../../common/src/state';

export const getState = async ({redis}: { redis: Redis }): Promise<CommonState> => {
    const serializedState = await redis.get('state');
    const stateObject = parseJson({json: serializedState});
    return CommonStateType.assert(stateObject);
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
