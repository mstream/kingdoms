// @flow

import { initialCommonState } from '../../../index';
import type { CommonStateActionReducer } from '../../types';
import { success } from '../../utils';
import type { CommonResetStateAction } from '../../../actions/types';
import type { CommonStateRules } from './types';

type Reducer = CommonStateActionReducer<
    CommonStateRules,
    CommonResetStateAction,
>;

export const resetStateRulesReducer: Reducer = ({
    action,
    globalState,
    localState,
}) => {
    return success({ state: initialCommonState.rules });
};
