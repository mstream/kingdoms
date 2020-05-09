// @flow

import type {
    ClientFailWorldsUpdateAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateWorlds,
} from '../types';

type Reducer = ClientStateActionReducer< ClientStateWorlds,
    ClientFailWorldsUpdateAction, >;

export const failWorldsUpdateReducer: Reducer = (
    {

        localState,
    },
) => {

    return {
        ...localState,
        isLoading: false,
    };

};
