// @flow

import {
    BUILDING_LUMBER_MILL,
    BUILDING_PASTURE,
    BUILDING_WAREHOUSE,
} from '../../../../../common/src/state/modules/rules/reducer/types';
import lumberMill from './lumber-mill.png';
import pasture from './pasture.png';
import warehouse from './warehouse.png';
import type {
    CommonStateBuildingKey,
} from '../../../../../common/src/state/modules/rules/reducer/types';

export const buildingVisuals = {
    [ BUILDING_LUMBER_MILL ]: {
        image: lumberMill,
        name : `Lumber Mill`,
    },
    [ BUILDING_PASTURE ]: {
        image: pasture,
        name : `Pasture`,
    },
    [ BUILDING_WAREHOUSE ]: {
        image: warehouse,
        name : `Warehouse`,
    },
};

export const buildingsOrder: $ReadOnlyArray< CommonStateBuildingKey > = [
    BUILDING_WAREHOUSE,
    BUILDING_PASTURE,
    BUILDING_LUMBER_MILL,
];
