// @flow

import lumberMill from './lumber-mill.png';
import pasture from './pasture.png';
import warehouse from './warehouse.png';
import {
    BUILDING_LUMBER_MILL,
    BUILDING_PASTURE,
    BUILDING_WAREHOUSE,
    UNIT_ARCHER, UNIT_CATAPULT, UNIT_KNIGHT, UNIT_NOBLE,
    UNIT_PEASANT,
    UNIT_PIKEMAN, UNIT_SWORDSMAN,
} from '../../../../../common/src/state';
import type { BuildingType, UnitType } from '../../../../../common/src/state';

export const buildingVisuals = {
    [BUILDING_LUMBER_MILL]: {
        name: 'Lumber Mill',
        image: lumberMill,
    },
    [BUILDING_PASTURE]: {
        name: 'Pasture',
        image: pasture,
    },
    [BUILDING_WAREHOUSE]: {
        name: 'Warehouse',
        image: warehouse,
    },
};

export const buildingsOrder: $ReadOnlyArray<BuildingType> = [
    BUILDING_WAREHOUSE,
    BUILDING_PASTURE,
    BUILDING_LUMBER_MILL,
];