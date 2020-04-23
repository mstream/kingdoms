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
    CommonStateCities,
} from '../types';

type Reducer = CommonStateActionReducer< CommonStateCities,
    CommonResetStateAction, >;

export const resetStateCitiesReducer: Reducer = () => {

    return success(
        {
            state: initialCommonState.cities,
        },
    );

};
