// @flow

import food from './food.png';
import wood from './wood.png';
import {
    RESOURCE_FOOD,
    RESOURCE_WOOD,
} from '../../../../../common/src/state';
import type { ResourceType } from '../../../../../common/src/state';

export const resourceVisuals = {
    [RESOURCE_FOOD]: {
        description: 'TODO',
        image: food,
        name: 'Food',
    },
    [RESOURCE_WOOD]: {
        description: 'TODO',
        image: wood,
        name: 'Wood',
    },
};

export const resourcesOrder: $ReadOnlyArray<ResourceType> = [
    RESOURCE_FOOD,
    RESOURCE_WOOD,
];