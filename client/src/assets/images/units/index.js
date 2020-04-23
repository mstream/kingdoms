// @flow

import {
    UNIT_ARCHER,
    UNIT_CATAPULT,
    UNIT_KNIGHT,
    UNIT_NOBLE,
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_SWORDSMAN,
} from '../../../../../common/src/state/modules/_children/rules/reducer/types';
import archer from './archer.png';
import catapult from './catapult.png';
import knight from './knight.png';
import noble from './noble.png';
import peasant from './peasant.png';
import pikeman from './pikeman.png';
import swordsman from './swordsman.png';
import type {
    CommonStateUnitKey,
} from '../../../../../common/src/state/modules/_children/rules/reducer/types';

export const unitVisuals = {
    [ UNIT_ARCHER ]: {
        description: `TODO`,
        image      : archer,
        name       : `Archers`,
    },
    [ UNIT_CATAPULT ]: {
        description: `TODO`,
        image      : catapult,
        name       : `Catapults`,
    },
    [ UNIT_KNIGHT ]: {
        description: `TODO`,
        image      : knight,
        name       : `Knights`,
    },
    [ UNIT_NOBLE ]: {
        description: `TODO`,
        image      : noble,
        name       : `Nobles`,
    },
    [ UNIT_PEASANT ]: {
        description: `TODO`,
        image      : peasant,
        name       : `Peasants`,
    },
    [ UNIT_PIKEMAN ]: {
        description: `TODO`,
        image      : pikeman,
        name       : `Pikemen`,
    },
    [ UNIT_SWORDSMAN ]: {
        description: `TODO`,
        image      : swordsman,
        name       : `Swordsmen`,
    },
};

export const unitsOrder: $ReadOnlyArray< CommonStateUnitKey > = [
    UNIT_PEASANT,
    UNIT_PIKEMAN,
    UNIT_ARCHER,
    UNIT_SWORDSMAN,
    UNIT_KNIGHT,
    UNIT_CATAPULT,
    UNIT_NOBLE,
];
