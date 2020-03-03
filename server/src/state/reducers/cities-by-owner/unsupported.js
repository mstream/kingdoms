// @flow

import type {
    ServerAction,
    ServerResetStateAction
} from '../../../../../common/src/actions';
import type {
    CommonStateCitiesByOwner,
    ServerState
} from '../../../../../common/src/state';
import type {ServerStateReducerResult} from '../root';
import {success} from '../root';
import {initialServerState} from '../../state';

export const unsupportedActionCitiesByOwnerReducer = ({action, state}: { action: ServerAction, state: ServerState }): ServerStateReducerResult<CommonStateCitiesByOwner> => {
    return success({state: state.citiesByOwner});
};
