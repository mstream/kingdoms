// @flow

import {parseJson} from '../../../common/src/util';
import type {Redis} from '../clients/redis';
import verror from "verror";
import { CommonStateType } from '../../../common/src/state';
import type { CommonState } from '../../../common/src/state';

export const getState = async ({redis}: { redis: Redis }): Promise<CommonState> => {
    try {
        const serializedState = await redis.get('state');
        const stateObject = parseJson({json: serializedState});
        return CommonStateType.assert(stateObject);
    } catch (error) {
        throw new verror.VError(
            {
                name: 'GetStateError',
                cause: error,
            },
            'could not retrieve the current state'
        );
    }
};

