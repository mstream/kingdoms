// @flow

import type { Quantities } from './quantity';
import { RESOURCE_FOOD, RESOURCE_WOOD } from './state/state';

export const convertQuantitiesToResources = ({ quantities }: { quantities: Quantities }) => {
    return {
        [RESOURCE_FOOD]: quantities[RESOURCE_FOOD] != null ? quantities[RESOURCE_FOOD] : 0,
        [RESOURCE_WOOD]: quantities[RESOURCE_WOOD] != null ? quantities[RESOURCE_WOOD] : 0,
    };
};
