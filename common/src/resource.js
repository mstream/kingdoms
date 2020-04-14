// @flow

import type {
    Quantities,
} from './quantity';
import type {
    CommonStateResourceKey,
} from './state/modules/rules/reducer/types';
import {
    RESOURCE_FOOD,
    RESOURCE_WOOD,
} from './state/modules/rules/reducer/types';

export const convertQuantitiesToResources = (
    {
        quantities,
    }: {
        quantities: Quantities,
    },
): { [CommonStateResourceKey]: number } => {

    return {
        [ RESOURCE_FOOD ]:
            quantities[ RESOURCE_FOOD ] == null
                ? 0
                : quantities[ RESOURCE_FOOD ],
        [ RESOURCE_WOOD ]:
            quantities[ RESOURCE_WOOD ] == null
                ? 0
                : quantities[ RESOURCE_WOOD ],
    };

};
