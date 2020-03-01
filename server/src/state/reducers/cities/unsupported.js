// @flow

import type {
    ServerAction,
    ServerResetStateAction
} from '../../../../../common/src/actions';
import type {
    CommonStateCities,
    ServerState
} from '../../../../../common/src/state';
import type {ServerStateReducerResult} from '../root';
import {success} from '../root';
import {initialState} from '../../state';

export const unsupportedActionCitiesReducer = ({action, state}: { action: ServerAction, state: ServerState }): ServerStateReducerResult<CommonStateCities> => {
    return success({state: state.cities});
};
