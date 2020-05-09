// @flow

import {
    clientActions,
} from '../../../../actions';
import {
    emptyClientState,
} from '../../../../../state';

import type {
    ClientRequestWorldsUpdateAction,
} from '../../actions/types';
import type {
    ClientStateErrorsReducerTestScenario,
} from './types';

type Scenario = ClientStateErrorsReducerTestScenario< ClientRequestWorldsUpdateAction >;
type Scenarios = $ReadOnlyArray< Scenario >;

export const requestWorldsUpdateTestScenarios: Scenarios = [
    {
        action                   : clientActions.worlds.requestWorldsUpdate(),
        expectedLocalStateCreator: (
            {
                previousLocalState,
            },
        ) => {

            return {
                ...previousLocalState,
                isLoading: true,
            };

        },
        name               : `requests worlds update`,
        previousGlobalState: {
            ...emptyClientState,
            worlds: {
                isLoading: false,
                items    : [],
            },
        },
    },
];
