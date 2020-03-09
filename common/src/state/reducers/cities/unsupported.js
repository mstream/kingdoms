// @flow

import type {
    ServerAction,
    ServerResetStateAction
} from '../../../../../common/src/actions';
import type {
    CommonStateCities,
    CommonState
} from '../../../../../common/src/state';
import type {CommonstateReducerResult} from '../root';
import {success} from '../root';
import {initialCommonstate} from '../../state';

export const unsupportedActionCitiesReducer = ({action, state}: { action: ServerAction, state: CommonState }): CommonstateReducerResult<CommonStateCities> => {
    return success({state: state.cities});
};
