// @flow

import lumberMill from './lumber-mill.png';
import pasture from './pasture.png';
import warehouse from './warehouse.png';
import {
    BUILDING_LUMBER_MILL,
    BUILDING_PASTURE, BUILDING_WAREHOUSE,
} from '../../../../../common/src/state';

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
