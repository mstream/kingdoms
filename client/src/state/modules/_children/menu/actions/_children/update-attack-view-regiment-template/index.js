// @flow

import {
    UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientUpdateAttackViewRegimentTemplateAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientUpdateAttackViewRegimentTemplateAction >;

export const updateAttackViewRegimentTemplate: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
    };

};
