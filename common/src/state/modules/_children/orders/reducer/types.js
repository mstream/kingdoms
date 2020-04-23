// @flow

import type {
    CommonStateUnitKey,
} from '../../rules/reducer/types';
import type {
    Range,
} from '../../../../../range';

export const ORDER_SCHEDULED_ATTACK: 'ORDER_SCHEDULED_ATTACK'
    = `ORDER_SCHEDULED_ATTACK`;

export type OrderKey = typeof ORDER_SCHEDULED_ATTACK;

type ScheduledOrder = $ReadOnly< { minimumDelay: number } >;

export type CommonStateRegimentTemplate = $ReadOnly< {
    [CommonStateUnitKey]: Range,
} >;

export type CommonStateScheduledAttackOrder = $ReadOnly< {
    ...ScheduledOrder,
    originCityId: string,
    regimentTemplate: CommonStateRegimentTemplate,
    targetCityId: string,
} >;

export type CommonStateOrder = CommonStateScheduledAttackOrder;
export type CommonStateOrderCreationTimes = $ReadOnly< { [string]: string } >;
export type CommonStateScheduledAttackOrders = $ReadOnly< {
    [string]: CommonStateScheduledAttackOrder,
} >;

export type CommonStateOrderItems = $ReadOnly< {
    scheduledAttack: CommonStateScheduledAttackOrders,
} >;

export type CommonStateOrderOwnerships = $ReadOnly< { [string]: string } >;

export type CommonStateOrders = $ReadOnly< {
    creationTimes: CommonStateOrderCreationTimes,
    items: CommonStateOrderItems,
    ownerships: CommonStateOrderOwnerships,
} >;
