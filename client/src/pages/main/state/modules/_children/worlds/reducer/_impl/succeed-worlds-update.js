// @flow

import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateWorlds,
} from '../types';
import type {

    ClientSucceedWorldsUpdateAction,
} from '../../actions/types';

type Reducer = ClientStateActionReducer< ClientStateWorlds,
    ClientSucceedWorldsUpdateAction, >;

export const succeedWorldsUpdateReducer: Reducer = (
    {
        action,
        localState,
    },
) => {

    return {
        ...localState,
        isLoading: false,
        items    : action.payload,
    };

};
