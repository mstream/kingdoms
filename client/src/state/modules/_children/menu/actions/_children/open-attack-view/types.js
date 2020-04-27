// @flow


import type {
    BaseAction,
} from '../../../../../../../../../common/src/types/actions';

export const OPEN_ATTACK_VIEW: 'OPEN_ATTACK_VIEW'
    = `OPEN_ATTACK_VIEW`;

export type ClientOpenAttackViewAction =
    BaseAction< typeof OPEN_ATTACK_VIEW,
        $ReadOnly< {| cityId: string |} >, >;
