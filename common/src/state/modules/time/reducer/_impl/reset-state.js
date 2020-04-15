// @flow

import {
    initialCommonState,
} from '../../../../index';
import {
    success,
} from '../../../utils';
import type {
    CommonResetStateAction,
} from '../../../../actions/types';
import type {
    CommonStateActionReducer,
} from '../../../types';
import type {
    CommonStateTime,
} from '../types';

type Reducer = CommonStateActionReducer< CommonStateTime,
    CommonResetStateAction, >;

export const resetStateTimeReducer: Reducer = () => {

    return success(
        {
            state: initialCommonState.time,
        },
    );

};
