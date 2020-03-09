// @flow

import type {ServerResetStateAction} from '../../../../../common/src/actions';
import type {
    CommonStateCities,
    CommonState
} from '../../../../../common/src/state';
import type {CommonstateReducerResult} from '../root';
import {success} from '../root';
import {initialCommonstate} from '../../state';

export const resetStateCitiesReducer = ({action, state}: { action: ServerResetStateAction, state: CommonState }): CommonstateReducerResult<CommonStateCities> => {
    return success({state: initialCommonstate.cities});
};
