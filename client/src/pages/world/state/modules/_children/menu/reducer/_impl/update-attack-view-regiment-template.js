// @flow

import type {
    ClientStateActionReducer,
} from '../../../../../types';
import type {
    ClientStateMenu,
} from '../types';
import type {
    ClientUpdateAttackViewRegimentTemplateAction,
} from '../../actions/types';

type Reducer = ClientStateActionReducer< ClientStateMenu,
    ClientUpdateAttackViewRegimentTemplateAction, >;

export const updateAttackViewRegimentTemplateReducer: Reducer = (
    {
        localState,
        action,
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
