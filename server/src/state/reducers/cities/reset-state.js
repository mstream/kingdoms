/**
 * @flow
 */

import type {ServerResetStateAction} from '../../../../../common/src/actions';
import type {
    CommonStateCities,
    ServerState
} from '../../../../../common/src/state';
import type {ServerStateReducerResult} from '../root';
import {success} from '../root';
import {initialState} from '../../state';

export const resetStateCitiesReducer = ({action, state}: { action: ServerResetStateAction, state: ServerState }): ServerStateReducerResult<CommonStateCities> => {
    return success({state: initialState.cities});
};
