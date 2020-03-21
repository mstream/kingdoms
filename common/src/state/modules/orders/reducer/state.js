// @flow


import type {
    CommonStateOrder,
    CommonStateOrders,
    CommonStateRegimentTemplate,
} from './types';
import {
    UNIT_ARCHER,
    UNIT_CATAPULT,
    UNIT_KNIGHT,
    UNIT_NOBLE,
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_SWORDSMAN,
} from '../../rules/reducer/types';
import { emptyRange } from '../../../../range';

export const emptyRegimentTemplateState: CommonStateRegimentTemplate = {
    [UNIT_ARCHER]: emptyRange,
    [UNIT_CATAPULT]: emptyRange,
    [UNIT_KNIGHT]: emptyRange,
    [UNIT_NOBLE]: emptyRange,
    [UNIT_PEASANT]: emptyRange,
    [UNIT_PIKEMAN]: emptyRange,
    [UNIT_SWORDSMAN]: emptyRange,
};

export const emptyOrderState: CommonStateOrder = {
    authorityId: '',
    creationTime: '',
    minimumDelay: 0,
    originCityId: '',
    regimentTemplate: {
        ...emptyRegimentTemplateState,
    },
    targetCityId: '',
};

export const emptyOrdersState: CommonStateOrders = {};
