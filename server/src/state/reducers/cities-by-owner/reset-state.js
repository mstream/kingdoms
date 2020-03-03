// @flow

import type {ServerResetStateAction} from '../../../../../common/src/actions';
import type {
    CommonStateCitiesByOwner,
    ServerState
} from '../../../../../common/src/state';
import type {ServerStateReducerResult} from '../root';
import {success} from '../root';
import {initialServerState} from '../../state';

export const resetStateCitiesByOwnerReducer = ({action, state}: { action: ServerResetStateAction, state: ServerState }): ServerStateReducerResult<CommonStateCitiesByOwner> => {
    return success({state: initialServerState.citiesByOwner});
};
