// @flow


import type {
    BaseAction,
} from '../../../../../../../../../common/src/types/actions';
import type {
    CommonStateRegimentTemplate,
} from '../../../../../../../../../common/src/state/modules/_children/orders/types';

type ActionKey = 'UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE';

export const UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE: ActionKey
    = `UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE`;

export type ClientUpdateAttackViewRegimentTemplateAction =
    BaseAction< typeof UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
        $ReadOnly< {| regimentTemplate: CommonStateRegimentTemplate |} >, >;
