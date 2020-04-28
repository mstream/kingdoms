// @flow

import type {
    BaseAction,
} from '../../../../../../../../../common/src/types/actions';
import type {
    CommonState,
} from '../../../../../../../../../common/src/state/modules/types';

export const UPDATE_STATE: 'UPDATE_STATE'
    = `UPDATE_STATE`;

export type ClientUpdateStateAction =
    BaseAction< typeof UPDATE_STATE,
        $ReadOnly< {| commonState: CommonState |} >, >;
