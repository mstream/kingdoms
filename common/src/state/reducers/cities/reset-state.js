// @flow

import type {ServerResetStateAction} from '../../../../../common/src/actions';
import type {CommonStateReducerResult} from '../root';
import {success} from '../root';
import {initialCommonState} from '../../index';
import type { CommonState, CommonStateCities } from '../../index';

export const resetStateCitiesReducer = ({action, state}: { action: ServerResetStateAction, state: CommonState }): CommonStateReducerResult<CommonStateCities> => {
    return success({state: initialCommonState.cities});
};
