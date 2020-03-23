// @flow

import type { ClientStateMenu } from './types';
import type { ClientState } from '../../types';
import type {
    ClientUpdateAttackViewMinimumDelayAction,
    ClientUpdateAttackViewRegimentTemplateAction,
} from '../actions/types';

export const updateAttackViewMinimumDelayReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientUpdateAttackViewMinimumDelayAction,
            globalState: ClientState,
        },
): ClientStateMenu => {
    return {
        ...localState,
        attackView: {
            ...localState.attackView,
            minimumDelay: action.payload.minimumDelay,
        },
    };
};
