// @flow


import type {
    BaseAction,
} from '../../../../../../../../../../../common/src/types/actions';

export const CLOSE_ATTACK_VIEW: 'CLOSE_ATTACK_VIEW'
    = `CLOSE_ATTACK_VIEW`;

export type ClientCloseAttackViewAction =
    BaseAction< typeof CLOSE_ATTACK_VIEW,
        void, >;

