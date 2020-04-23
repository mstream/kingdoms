// @flow

import {
    worldSelector,
} from './_impl/world';
import type {
    CommonStateSelectors,
} from '../../../types';

export const commonStateWorldSelectors: CommonStateSelectors = {
    world: worldSelector,
};
