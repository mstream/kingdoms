// @flow

import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateCommonState,
} from '../types';
import type {
    ClientUpdateStateAction,
} from '../../actions/types';

type Reducer = ClientStateActionReducer< ClientStateCommonState,
    ClientUpdateStateAction, >;

export const updateStateCommonStateReducer: Reducer = (
    {
        action,
    },
) => {

    return action.payload.commonState;

};
