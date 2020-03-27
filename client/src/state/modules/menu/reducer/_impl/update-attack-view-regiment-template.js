// @flow

import type { ClientStateMenu } from '../types';
import type { ClientStateActionReducer } from '../../../types';
import type { ClientUpdateAttackViewRegimentTemplateAction } from '../../actions/types';

type Reducer = ClientStateActionReducer<ClientStateMenu, ClientUpdateAttackViewRegimentTemplateAction>;


export const updateAttackViewRegimentTemplateReducer: Reducer = (
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
            regimentTemplate: action.payload.regimentTemplate,
        },
    };
};
