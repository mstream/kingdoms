// @flow

import {parseJson} from '../../../common/src/util';
import type {ServerState} from '../../../common/src/state';
import {ServerStateType} from '../../../common/src/state';
import type {Redis} from '../clients/redis';

export const getState = async ({redis}: { redis: Redis }): Promise<ServerState> => {
    const serializedState = await redis.get('state');
    const stateObject = parseJson({json: serializedState});
    return ServerStateType.assert(stateObject);
};

