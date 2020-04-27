// @flow


import type {
    BaseAction,
} from '../../../../../../../../../common/src/types/actions';
import type {
    CommonStateRegimentTemplate,
} from '../../../../../../../../../common/src/state/modules/_children/orders/reducer/types';

export const UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE: 'UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE'
    = `UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE`;

export type ClientUpdateAttackViewRegimentTemplateAction =
    BaseAction< typeof UPDATE_ATTACK_VIEW_REGIMENT_TEMPLATE,
        $ReadOnly< {| regimentTemplate: CommonStateRegimentTemplate |} >, >;
