// @flow

import type {
    ClientStateCommonState,
} from '../types';
import type {
    ClientUpdateStateAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';

type Reducer = ClientStateActionReducer< ClientStateCommonState,
    ClientUpdateStateAction, >;

export const updateStateCommonStateReducer: Reducer = (
    {
        action,
    },
) => {

    return action.payload.commonState;

};
