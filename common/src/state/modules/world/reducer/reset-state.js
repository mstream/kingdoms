// @flow

import { initialCommonState } from '../../../index';
import type { CommonStateWorld } from './types';
import type {
    CommonState,
    CommonStateReducerResult,
} from '../../types';
import { success } from '../../utils';
import type { CommonResetStateAction } from '../../../actions/types';

export const resetStateWorldReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: CommonResetStateAction,
        globalState: CommonState,
        localState: CommonStateWorld,
    },
): CommonStateReducerResult<CommonStateWorld> => {
    return success({ state: initialCommonState.world });
};
