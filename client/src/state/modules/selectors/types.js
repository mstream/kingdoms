// @flow

import type { CommonStateScheduledAttackOrder } from '../../../../../common/src/state/modules/orders/reducer/types';

export type ScheduledAttackOrderInfo = {
    ...CommonStateScheduledAttackOrder,
    creationTime: string,
    playerId: string,
};
export type ScheduledAttackOrderInfosById = $ReadOnly<{
    [string]: ScheduledAttackOrderInfo,
}>;
