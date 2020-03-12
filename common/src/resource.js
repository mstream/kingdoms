// @flow

import type { Quantities } from './quantity';
import type { ResourceType } from './state';
import { RESOURCE_FOOD, RESOURCE_WOOD } from './state';

export const convertQuantitiesToResources = ({ quantities }: { quantities: Quantities }): { [ResourceType]: number, ... } => {
    return {
        [RESOURCE_FOOD]: quantities[RESOURCE_FOOD] != null ? quantities[RESOURCE_FOOD] : 0,
        [RESOURCE_WOOD]: quantities[RESOURCE_WOOD] != null ? quantities[RESOURCE_WOOD] : 0,
    };
};
