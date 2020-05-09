// @flow

import type {
    ClientLoadPlayerAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStatePlayer,
} from '../types';

type Reducer = ClientStateActionReducer< ClientStatePlayer,
    ClientLoadPlayerAction, >;

export const loadPlayerPlayerReducer: Reducer = (
    {
        action,
        localState,
    },
) => {

    return {
        ...localState,
        name: action.payload.name,
    };

};
