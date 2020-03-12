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
        name: 'Archers',
        image: archer,
    },
    [UNIT_CATAPULT]: {
        name: 'Catapults',
        image: catapult,
    },
    [UNIT_KNIGHT]: {
        name: 'Knights',
        image: knight,
    },
    [UNIT_NOBLE]: {
        name: 'Nobles',
        image: noble,
    },
    [UNIT_PEASANT]: {
        name: 'Peasants',
        image: peasant,
    },
    [UNIT_PIKEMAN]: {
        name: 'Pikemen',
        image: pikeman,
    },
    [UNIT_SWORDMAN]: {
        name: 'Swordmen',
        image: swordman,
    },
};