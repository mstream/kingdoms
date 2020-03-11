// @flow

import type {ServerResetStateAction} from '../../../../../common/src/actions';
import type {CommonStateReducerResult} from '../root';
import {success} from '../root';
import {initialCommonState} from '../../state';
import type { CommonState, CommonStateCities } from '../../state';

export const resetStateCitiesReducer = ({action, state}: { action: ServerResetStateAction, state: CommonState }): CommonStateReducerResult<CommonStateCities> => {
    return success({state: initialCommonState.cities});
};
