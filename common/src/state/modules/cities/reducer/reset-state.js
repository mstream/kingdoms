// @flow

import { initialCommonState } from '../../../index';
import type { CommonStateCities } from './types';
import type {
    CommonState,
    CommonStateReducerResult,
} from '../../types';
import { success } from '../../utils';
import type { CommonResetStateAction } from '../../../actions/types';

export const resetStateCitiesReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: CommonResetStateAction,
        globalState: CommonState,
        localState: CommonStateCities,
    },
): CommonStateReducerResult<CommonStateCities> => {
    return success({ state: initialCommonState.cities });
};
