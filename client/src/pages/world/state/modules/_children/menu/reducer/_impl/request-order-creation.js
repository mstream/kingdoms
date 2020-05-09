// @flow

import type {
    ClientRequestOrderCreationAction,
} from '../../../common-state/actions/types';
import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateMenu,
} from '../types';

type Reducer = ClientStateActionReducer< ClientStateMenu,
    ClientRequestOrderCreationAction, >;

export const requestOrderCreationMenuReducer: Reducer = (
    {
        localState,
    },
) => {

    return {
        ...localState,
        attackView: {
            ...localState.attackView,
            isSubmitting: true,
        },
    };

};
