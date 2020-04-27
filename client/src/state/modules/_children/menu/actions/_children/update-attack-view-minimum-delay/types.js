// @flow


import type {
    BaseAction,
} from '../../../../../../../../../common/src/types/actions';

export const UPDATE_ATTACK_VIEW_MINIMUM_DELAY: 'UPDATE_ATTACK_VIEW_MINIMUM_DELAY'
    = `UPDATE_ATTACK_VIEW_MINIMUM_DELAY`;


export type ClientUpdateAttackViewMinimumDelayAction =
    BaseAction< typeof UPDATE_ATTACK_VIEW_MINIMUM_DELAY,
        $ReadOnly< {| minimumDelay: number |} >, >;
