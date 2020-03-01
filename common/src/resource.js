// @flow

import type {Quantities} from './quantity';

export const convertQuantitiesToResources = ({quantities}: { quantities: Quantities }) => {
    return {
        food: quantities.food != null ? quantities.food : 0,
        wood: quantities.food != null ? quantities.wood : 0,
    }
};
