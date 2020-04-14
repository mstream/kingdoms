// @flow

import {
    initialCommonState,
} from '../../../../index';
import type {
    CommonStateTime,
} from '../types';
import type {
    CommonStateActionReducer,
} from '../../../types';
import {
    success,
} from '../../../utils';
import type {
    CommonResetStateAction,
} from '../../../../actions/types';

type Reducer = CommonStateActionReducer< CommonStateTime,
    CommonResetStateAction, >;

export const resetStateTimeReducer: Reducer = () => {

    return success(
        {
            state: initialCommonState.time,
        },
    );

};
