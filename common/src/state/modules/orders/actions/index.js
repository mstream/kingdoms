// @flow

import type { CommonCreateScheduledAttackOrderAction } from './types';
import { CREATE_SCHEDULED_ATTACK_ORDER } from './types';
import type { CommonActionCreator } from '../../../types';

export const createScheduledAttackOrder: CommonActionCreator<CommonCreateScheduledAttackOrderAction> = (
    payload,
) => {
    return {
        type: CREATE_SCHEDULED_ATTACK_ORDER,
        payload,
    };
};
