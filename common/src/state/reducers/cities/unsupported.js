// @flow

import type {
    ServerAction,
    ServerResetStateAction
} from '../../../../../common/src/actions';
import type {
    CommonStateCities,
    CommonState
} from '../../../../../common/src/state';
import type {CommonStateReducerResult} from '../root';
import {success} from '../root';
import {initialCommonState} from '../../state';

export const unsupportedActionCitiesReducer = ({action, state}: { action: ServerAction, state: CommonState }): CommonStateReducerResult<CommonStateCities> => {
    return success({state: state.cities});
};
