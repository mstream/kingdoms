// @flow

import type { ClientStateMenu } from './types';
import type { ClientState } from '../../types';
import type { ClientUpdateAttackViewRegimentTemplateAction } from '../actions/types';

export const updateAttackViewRegimentTemplateReducer = (
    {
        localState,
        action,
        globalState,
    }:
        {
            localState: ClientStateMenu,
            action: ClientUpdateAttackViewRegimentTemplateAction,
            globalState: ClientState,
        },
): ClientStateMenu => {
    return {
        ...localState,
        attackView: {
            ...localState.attackView,
            regimentTemplate: action.payload.regimentTemplate,
        },
    };
};
