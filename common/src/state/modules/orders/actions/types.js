// @flow

import type { BasePlayerAction } from '../../../../types/actions';
import type { CommonStateScheduledAttackOrder } from '../reducer/types';

export const CREATE_SCHEDULED_ATTACK_ORDER: 'CREATE_SCHEDULED_ATTACK_ORDER' =
    'CREATE_SCHEDULED_ATTACK_ORDER';

export type CommonCreateScheduledAttackOrderAction = BasePlayerAction<
    typeof CREATE_SCHEDULED_ATTACK_ORDER,
    $ReadOnly<{
        ...CommonStateScheduledAttackOrder,
        orderId: string,
        playerId: string,
    }>,
>;
