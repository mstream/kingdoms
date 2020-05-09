// @flow

import {
    clientActions,
} from '../../../../actions';
import {
    emptyClientState,
} from '../../../../../state';
import type {
    ClientFailWorldsUpdateAction,
} from '../../actions/types';
import type {
    ClientStateErrorsReducerTestScenario,
} from './types';

type Scenario = ClientStateErrorsReducerTestScenario< ClientFailWorldsUpdateAction >;
type Scenarios = $ReadOnlyArray< Scenario >;

export const failWorldsUpdateTestScenarios: Scenarios = [
    {
        action: clientActions.worlds.failWorldsUpdate(
            `error1`,
        ),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                isLoading: false,
            };

        },
        name               : `requests worlds update`,
        previousGlobalState: {
            ...emptyClientState,
            worlds: {
                isLoading: true,
                items    : [],
            },
        },
    },
];
