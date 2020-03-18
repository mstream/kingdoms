// @flow

import { initialCommonState } from '../../../index';
import type { CommonStateTime } from './types';
import type {
    CommonState,
    CommonStateReducerResult,
} from '../../types';
import { success } from '../../utils';
import type { CommonResetStateAction } from '../../../actions/types';

export const resetStateTimeReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: CommonResetStateAction,
        globalState: CommonState,
        localState: CommonStateTime,
    },
): CommonStateReducerResult<CommonStateTime> => {
    return success({ state: initialCommonState.time });
};
