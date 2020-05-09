// @flow

import type {
    ClientRequestWorldsUpdateAction,
} from '../../actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateWorlds,
} from '../types';

type Reducer = ClientStateActionReducer< ClientStateWorlds,
    ClientRequestWorldsUpdateAction, >;

export const requestWorldsUpdateReducer: Reducer = (
    {

        localState,
    },
) => {

    return {
        ...localState,
        isLoading: true,
    };

};
