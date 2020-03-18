// @flow

import { initialCommonState } from '../../../index';
import type { CommonStateRules } from './types';
import type {
    CommonState,
    CommonStateReducerResult,
} from '../../types';
import { success } from '../../utils';
import type { CommonResetStateAction } from '../../../actions/types';

export const resetStateRulesReducer = (
    {
        action,
        globalState,
        localState,
    }: {
        action: CommonResetStateAction,
        globalState: CommonState,
        localState: CommonStateRules,
    },
): CommonStateReducerResult<CommonStateRules> => {
    return success({ state: initialCommonState.rules });
};
