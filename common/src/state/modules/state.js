// @flow

import {
    UNIT_ARCHER,
    UNIT_CATAPULT,
    UNIT_KNIGHT,
    UNIT_NOBLE,
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_SWORDSMAN,
} from './rules/reducer/types';
import { emptyRange } from '../../range';
import type { CommonState, CommonStateRegimentTemplate } from './types';
import { emptyTimeState } from './time/reducer/state';
import { emptyWorldState } from './world/reducer/state';
import { emptyRulesState } from './rules/reducer/state';
import { emptyCitiesState } from './cities/reducer/state';

export const emptyCommonState: CommonState = {
    cities: emptyCitiesState,
    rules: emptyRulesState,
    time: emptyTimeState,
    world: emptyWorldState,
};

export const emptyRegimentTemplateState: CommonStateRegimentTemplate = {
    [UNIT_ARCHER]: emptyRange,
    [UNIT_CATAPULT]: emptyRange,
    [UNIT_KNIGHT]: emptyRange,
    [UNIT_NOBLE]: emptyRange,
    [UNIT_PEASANT]: emptyRange,
    [UNIT_PIKEMAN]: emptyRange,
    [UNIT_SWORDSMAN]: emptyRange,
};

