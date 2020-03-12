// @flow

import archer from './archer.png';
import catapult from './catapult.png';
import knight from './knight.png';
import noble from './noble.png';
import peasant from './peasant.png';
import pikeman from './pikeman.png';
import swordman from './swordman.png';
import {
    UNIT_ARCHER,
    UNIT_CATAPULT,
    UNIT_KNIGHT,
    UNIT_NOBLE,
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_SWORDMAN,
} from '../../../../../common/src/state';

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
    [UNIT_SWORDMAN]: {
        description: 'TODO',
        name: 'Swordmen',
        image: swordman,
    },
};