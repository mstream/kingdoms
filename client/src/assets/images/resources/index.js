// @flow

import food from './food.png';
import wood from './wood.png';
import {
    RESOURCE_FOOD,
    RESOURCE_WOOD,
} from '../../../../../common/src/state/state';

export const resourceVisuals = {
    [RESOURCE_FOOD]: {
        name: 'Food',
        image: food,
    },
    [RESOURCE_WOOD]: {
        name: 'Wood',
        image: wood,
    },
};
