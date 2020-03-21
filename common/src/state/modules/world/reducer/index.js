// @flow

import { initialCommonState } from '../../../index';
import type { CommonStateWorld } from './types';
import { unsupportedActionReducer } from '../../unsupported-action-reducer';
import { resetStateWorldReducer } from './reset-state';
import type {
    CommonState,
    CommonStateReducerResult,
} from '../../types';
import { RESET_STATE } from '../../../actions/types';
import type { CommonAction } from '../../../types';

export const worldReducer = (
    localState: CommonStateWorld = initialCommonState.world,
    action: CommonAction,
    globalState: CommonState,
): CommonStateReducerResult<CommonStateWorld> => {
    switch (action.type) {
        case RESET_STATE: {
            return resetStateWorldReducer({
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
