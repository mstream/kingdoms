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
    CommonStateWorld,
} from '../types';

type Reducer = CommonStateActionReducer< CommonStateWorld,
    CommonResetStateAction, >;

export const resetStateWorldReducer: Reducer = () => {

    return success(
        {
            state: initialCommonState.world,
        },
    );

};
