// @flow

import type {
    BaseAction,
} from '../../../../../../../../../../../common/src/types/actions';

export const SELECT_ATTACK_VIEW_ATTACKING_CITY: 'SELECT_ATTACK_VIEW_ATTACKING_CITY'
    = `SELECT_ATTACK_VIEW_ATTACKING_CITY`;


export type ClientSelectAttackViewAttackingCityAction =
    BaseAction< typeof SELECT_ATTACK_VIEW_ATTACKING_CITY,
        $ReadOnly< {| cityId: string |} >, >;
