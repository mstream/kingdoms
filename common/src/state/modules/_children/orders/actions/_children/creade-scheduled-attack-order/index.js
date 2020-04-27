// @flow

import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from './types';
import type {
    CommonActionCreator,
} from '../../../../../../types';
import type {
    CommonCreateScheduledAttackOrderAction,
} from './types';

type ActionCreator = CommonActionCreator< CommonCreateScheduledAttackOrderAction >;

export const createScheduledAttackOrder: ActionCreator = (
    payload,
) => {

    return {
        payload,
        type: CREATE_SCHEDULED_ATTACK_ORDER,
    };

};
