// @flow


import {
    emptyCommonState,
} from '../../../../../../state';
import {
    executeTimeStep,
} from '../../../../actions';
import {
    failure,
} from '../../../../../../utils';
import type {
    Scenario,
} from '../types';


export const scenario01: Scenario = {
    action: executeTimeStep(
        {
            time: `2000-01-01T01:00:00Z`,
        },
    ),
    expectedReductionResultCreator: () => {

        return failure(
            {
                errors: [
                    `the time from the action `
                    + `is not past the time from the state`,
                ],
            },
        );

    },
    name               : `previous time newer than the one from action`,
    previousGlobalState: {
        ...emptyCommonState,
        time: `2000-01-01T02:00:00Z`,
    },
};
