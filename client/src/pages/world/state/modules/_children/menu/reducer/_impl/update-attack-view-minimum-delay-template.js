// @flow

import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateMenu,
} from '../types';
import type {
    ClientUpdateAttackViewMinimumDelayAction,
} from '../../actions/types';

type Reducer = ClientStateActionReducer< ClientStateMenu,
    ClientUpdateAttackViewMinimumDelayAction, >;

export const updateAttackViewMinimumDelayReducer: Reducer = (
    {
        localState,
        action,

    },
) => {

    return {
        ...localState,
        attackView: {
            ...localState.attackView,
            minimumDelay: action.payload.minimumDelay,
        },
    };

};
