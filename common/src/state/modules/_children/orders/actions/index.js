// @flow

import {
    CREATE_SCHEDULED_ATTACK_ORDER,
} from './types';
import type {
    CommonActionCreator,
} from '../../../../types';
import type {
    CommonCreateScheduledAttackOrderAction,
} from './types';

export const createScheduledAttackOrder: CommonActionCreator< CommonCreateScheduledAttackOrderAction > = (
    payload,
) => {

    return {
        payload,
        type: CREATE_SCHEDULED_ATTACK_ORDER,
    };

};
