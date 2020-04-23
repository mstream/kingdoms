// @flow

import {
    initialCommonState,
} from '../../../../../index';
import {
    success,
} from '../../../../utils';
import type {
    CommonResetStateAction,
} from '../../../../../actions/types';
import type {
    CommonStateActionReducer,
} from '../../../../types';
import type {
    CommonStateRules,
} from '../types';

type Reducer = CommonStateActionReducer< CommonStateRules,
    CommonResetStateAction, >;

export const resetStateRulesReducer: Reducer = () => {

    return success(
        {
            state: initialCommonState.rules,
        },
    );

};
