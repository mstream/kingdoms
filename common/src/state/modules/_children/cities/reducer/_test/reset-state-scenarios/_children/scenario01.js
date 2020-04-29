// @flow


import {
    emptyCityState,
} from '../../../state';
import {
    emptyCommonState,
} from '../../../../../../state';
import {
    initialCommonState,
} from '../../../../../../../index';
import {
    resetState,
} from '../../../../../../../actions';
import {
    success,
} from '../../../../../../utils';
import type {
    Scenario,
} from '../types';

export const scenario01: Scenario = {
    action                        : resetState(),
    expectedReductionResultCreator: () => {

        return success(
            {
                state: initialCommonState.cities,
            },
        );

    },
    name               : `resets its state`,
    previousGlobalState: {
        ...emptyCommonState,
        cities: {
            city1: {
                ...emptyCityState,
            },
        },
    },
};
