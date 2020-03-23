// @flow

import type { ClientStateMenu } from './types';
import type { ClientStateActionReducer } from '../../types';
import type { ClientUpdateAttackViewMinimumDelayAction } from '../actions/types';

type Reducer = ClientStateActionReducer<ClientStateMenu, ClientUpdateAttackViewMinimumDelayAction>;

export const updateAttackViewMinimumDelayReducer: Reducer = (
    {
        localState,
        action,
        globalState,
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
