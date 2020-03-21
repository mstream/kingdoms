// @flow

import type { CommonStateUnitKey } from '../../rules/reducer/types';
import type { Range } from '../../../../range';

export type CommonStateRegimentTemplate = $ReadOnly<{ [CommonStateUnitKey]: Range, ... }>;

export type CommonStateOrder = $ReadOnly<{
    authorityId: string,
    creationTime: string,
    minimumDelay: number,
    originCityId: string,
    regimentTemplate: CommonStateRegimentTemplate,
    targetCityId: string,
}>;

export type CommonStateOrders = $ReadOnly<{ [string]: CommonStateOrder, ... }>;
