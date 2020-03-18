// @flow

import archer from './archer.png';
import catapult from './catapult.png';
import knight from './knight.png';
import noble from './noble.png';
import peasant from './peasant.png';
import pikeman from './pikeman.png';
import swordsman from './swordsman.png';
import type { CommonStateUnitKey } from '../../../../../common/src/state/modules/rules/reducer/types';
import {
    UNIT_ARCHER,
    UNIT_CATAPULT,
    UNIT_KNIGHT,
    UNIT_NOBLE,
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_SWORDSMAN,
} from '../../../../../common/src/state/modules/rules/reducer/types';

export const unitVisuals = {
    [UNIT_ARCHER]: {
        description: 'TODO',
        name: 'Archers',
        image: archer,
    },
    [UNIT_CATAPULT]: {
        description: 'TODO',
        name: 'Catapults',
        image: catapult,
    },
    [UNIT_KNIGHT]: {
        description: 'TODO',
        name: 'Knights',
        image: knight,
    },
    [UNIT_NOBLE]: {
        description: 'TODO',
        name: 'Nobles',
        image: noble,
    },
    [UNIT_PEASANT]: {
        description: 'TODO',
        name: 'Peasants',
        image: peasant,
    },
    [UNIT_PIKEMAN]: {
        description: 'TODO',
        name: 'Pikemen',
        image: pikeman,
    },
    [UNIT_SWORDSMAN]: {
        description: 'TODO',
        name: 'Swordsmen',
        image: swordsman,
    },
};

export const unitsOrder: $ReadOnlyArray<CommonStateUnitKey> = [
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_ARCHER,
    UNIT_SWORDSMAN,
    UNIT_KNIGHT,
    UNIT_CATAPULT,
    UNIT_NOBLE,
];