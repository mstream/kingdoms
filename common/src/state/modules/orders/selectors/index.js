// @flow

import type { CommonStateRegimentTemplate } from '../reducer/types';
import type { CommonStateUnitKey } from '../../rules/reducer/types';


export const commonStateMinimumRegimentSizeSelector = (regimentTemplate: CommonStateRegimentTemplate): number => {
    return Object.keys(regimentTemplate).reduce(
        (minimumRegimentSize, unitType: CommonStateUnitKey) => {
            return minimumRegimentSize + regimentTemplate[unitType].from;
        },
        0,
    );
};