// @flow

import { initialCommonState } from '../../../index';
import type { CommonStateRules } from './types';
import { unsupportedActionReducer } from '../../unsupported-action-reducer';
import { resetStateRulesReducer } from './reset-state';
import type {
    CommonState,
    CommonStateReducerResult,
} from '../../types';
import { RESET_STATE } from '../../../actions/types';
import type { CommonAction } from '../../../types';

export const rulesReducer = (
    localState: CommonStateRules = initialCommonState.rules,
    action: CommonAction,
    globalState: CommonState,
): CommonStateReducerResult<CommonStateRules> => {
    switch (action.type) {
        case RESET_STATE: {
            return resetStateRulesReducer({
                action,
                globalState,
                localState,
            });
        }
        default: {
            return unsupportedActionReducer({
                action,
                globalState,
                localState,
            });
        }
    }
};
