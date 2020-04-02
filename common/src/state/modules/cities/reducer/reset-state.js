// @flow

import { initialCommonState } from '../../../index';
import type { CommonStateCities } from './types';
import type { CommonStateActionReducer } from '../../types';
import { success } from '../../utils';
import type { CommonResetStateAction } from '../../../actions/types';

type Reducer = CommonStateActionReducer<
    CommonStateCities,
    CommonResetStateAction,
>;

export const resetStateCitiesReducer: Reducer = ({
    action,
    globalState,
    localState,
}) => {
    return success({ state: initialCommonState.cities });
};
