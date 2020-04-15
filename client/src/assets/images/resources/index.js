// @flow

import {
    RESOURCE_FOOD,
    RESOURCE_WOOD,
} from '../../../../../common/src/state/modules/rules/reducer/types';
import food from './food.png';
import wood from './wood.png';
import type {
    CommonStateResourceKey,
} from '../../../../../common/src/state/modules/rules/reducer/types';

export const resourceVisuals = {
    [ RESOURCE_FOOD ]: {
        description: `TODO`,
        image      : food,
        name       : `Food`,
    },
    [ RESOURCE_WOOD ]: {
        description: `TODO`,
        image      : wood,
        name       : `Wood`,
    },
};

export const resourcesOrder: $ReadOnlyArray< CommonStateResourceKey > = [
    RESOURCE_FOOD,
    RESOURCE_WOOD,
];
