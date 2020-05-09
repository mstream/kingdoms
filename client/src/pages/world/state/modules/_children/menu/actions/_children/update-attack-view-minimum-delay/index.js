// @flow

import {
    UPDATE_ATTACK_VIEW_MINIMUM_DELAY,
} from './types';
import type {
    ClientActionCreator,
} from '../../../../../../types';
import type {
    ClientUpdateAttackViewMinimumDelayAction,
} from './types';

type ActionCreator = ClientActionCreator< ClientUpdateAttackViewMinimumDelayAction >;

export const updateAttackViewMinimumDelay: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: UPDATE_ATTACK_VIEW_MINIMUM_DELAY,
    };

};
